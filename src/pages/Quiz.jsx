import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AUDIENCE_DEPENDENT,
  QUESTION_COUNT,
  QUIZ_STORAGE_KEY,
  getQuestions,
  recommend,
  stepNotes,
  unitCount,
} from "../data/quiz";
import "../styles/learning-theme.css";
import "./Quiz.css";

// Progress is kept for this browser tab only, so returning from a recommended
// unit with the Back button shows the results again. Nothing is sent anywhere.
// Field names follow section 6 of the Intro Quiz Specs doc.
function loadProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(QUIZ_STORAGE_KEY));
    if (saved && Number.isInteger(saved.step) && saved.answers) {
      // Every question after the first depends on the audience. Older saved
      // progress (before audiences) has no audience and starts over.
      if (typeof saved.answers.audience !== "string") return { step: Math.min(saved.step, 1), answers: {} };
      return saved;
    }
  } catch {
    // Storage can be unavailable (private windows, blocked storage); start fresh.
  }
  return { step: 0, answers: {} };
}

// Stroke icons for the audience options (24px grid, drawn with currentColor).
const ICON_PATHS = {
  book: (
    <>
      <path d="M2 6h7a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H2z" />
      <path d="M22 6h-7a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h8z" />
    </>
  ),
  handshake: (
    <>
      <path d="M8 12l3 3a2 2 0 0 0 3 0l5-5" />
      <path d="M2 9l4-4 4 3h4l4-3 4 4-4 4" />
      <path d="M6 13l-2 2" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18" />
      <path d="M12 8v13" />
      <path d="M12 8c-2-4-6-4-6-1s6 1 6 1c0 0 6 2 6-1s-4-3-6 1z" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15c3 0 5 2 5 4.5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18z" />
    </>
  ),
};

function Icon({ name, size = 22 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function CardBand({ title, note }) {
  return (
    <div className="quiz-band">
      <p className="quiz-band-title">{title}</p>
      {note && <p className="quiz-band-note">{note}</p>}
    </div>
  );
}

function Progress({ step }) {
  return (
    <div className="quiz-progress-block">
      <div className="quiz-progress-row">
        <p className="quiz-progress-label">
          Question {step} <span>of {QUESTION_COUNT}</span>
        </p>
        <p className="quiz-progress-note">{stepNotes[step - 1]}</p>
      </div>
      <div
        className="quiz-segments"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={QUESTION_COUNT}
        aria-valuenow={step}
      >
        {Array.from({ length: QUESTION_COUNT }, (_, index) => (
          <span
            key={index}
            className={index + 1 < step ? "done" : index + 1 === step ? "current" : ""}
          />
        ))}
      </div>
    </div>
  );
}

function AudienceOptions({ question, value, onPick }) {
  return (
    <div className="quiz-role-grid">
      {question.options.map((audience) => {
        const isOn = value === audience.id;
        return (
          <button
            key={audience.id}
            type="button"
            aria-pressed={isOn}
            className={isOn ? "quiz-role selected" : "quiz-role"}
            onClick={() => onPick(audience.id)}
          >
            <span className="quiz-role-icon">
              <Icon name={audience.icon} />
            </span>
            <span className="quiz-option-text">
              <span className="quiz-option-label">{audience.label}</span>
              <span className="quiz-option-detail">{audience.detail}</span>
            </span>
            {isOn && (
              <span className="quiz-check-badge" aria-hidden="true">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SingleOptions({ question, value, onPick }) {
  return question.options.map((option) => {
    const isOn = value === option.id;
    return (
      <button
        key={option.id}
        type="button"
        aria-pressed={isOn}
        className={isOn ? "quiz-option selected" : "quiz-option"}
        onClick={() => onPick(option.id)}
      >
        <span className={isOn ? "quiz-option-mark on" : "quiz-option-mark"} aria-hidden="true">
          {isOn ? "✓" : ""}
        </span>
        <span className="quiz-option-text">
          <span className="quiz-option-label">{option.label}</span>
          {option.detail && <span className="quiz-option-detail">{option.detail}</span>}
        </span>
      </button>
    );
  });
}

// Question 4: rank the tasks that apply, biggest first. Unranked tasks count
// as not applying.
function RankOptions({ question, ranking, onRank }) {
  return (
    <>
      <p className="quiz-rank-status" aria-live="polite">
        {ranking.length === 0 ? "None ranked yet" : `${ranking.length} ranked`}
      </p>
      <ul className="quiz-rank-list">
        {question.options.map((task) => {
          const rank = ranking.indexOf(task.id) + 1;
          return (
            <li key={task.id} className={rank > 0 ? "quiz-rank-row ranked" : "quiz-rank-row"}>
              <button
                type="button"
                className="quiz-rank-main"
                aria-pressed={rank > 0}
                aria-label={
                  rank > 0
                    ? `${task.label}, ranked ${rank}. Select to remove the rank.`
                    : `${task.label}, not ranked. Select to rank it ${ranking.length + 1}.`
                }
                onClick={() => onRank(task.id)}
              >
                <span className={rank > 0 ? "quiz-rank-circle on" : "quiz-rank-circle"} aria-hidden="true">
                  {rank > 0 ? rank : ""}
                </span>
                <span className="quiz-rank-label">{task.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function HumanNote() {
  return (
    <div className="quiz-human-note">
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
      </svg>
      <p>
        AI can save you time on drafting and organizing. People still check the facts and make the
        decisions, and each unit shows where that line sits for the task it covers.
      </p>
    </div>
  );
}

function Results({ answers, headingRef, onStartOver }) {
  const { audience, subtype, starts, picks, others } = recommend(answers);
  const steps = [
    ...starts.map((entry) => ({ ...entry, isStart: true })),
    ...picks.map((entry) => ({ ...entry, isStart: false })),
  ];
  const who = subtype?.label ?? audience?.label;
  const first = steps[0].unit;

  return (
    <>
      <CardBand title="Your starting point" note={`All ${QUESTION_COUNT} questions answered`} />
      <div className="quiz-body">
        {who && (
          <p className="quiz-role-tag">
            {audience && <Icon name={audience.icon} size={16} />}
            <span>{who}</span>
          </p>
        )}
        <h1 ref={headingRef} tabIndex={-1} className="quiz-title">
          Your Recommended Units
        </h1>
        <p className="quiz-lede">
          {who ? (
            <>
              Recommended for <strong>{who}</strong>.{" "}
            </>
          ) : null}
          Each recommendation shows the answer it came from.
        </p>

        <HumanNote />

        <ol className="quiz-path">
          {steps.map(({ unit, reason, isStart }, index) => (
            <li key={unit.slug} className={isStart ? "quiz-path-step start" : "quiz-path-step"}>
              <span className="quiz-path-marker" aria-hidden="true">
                <span className="quiz-path-number">{index + 1}</span>
              </span>
              <div className="quiz-path-card">
                {isStart ? (
                  <span className="quiz-badge">{index === 0 ? "Start here" : "Everyone"}</span>
                ) : (
                  <span className="quiz-path-category">{unit.categoryTitle}</span>
                )}
                <Link to={unit.href} className="quiz-path-title">
                  {unit.title}
                </Link>
                <p className="quiz-path-reason">{reason}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="quiz-progress-callout">
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M7 15l4-4 3 3 5-6" />
          </svg>
          <p>Each unit ends with a short knowledge check. Your scores appear on your progress page.</p>
          <Link to="/progress">View my progress</Link>
        </div>

        <div className="quiz-actions">
          <Link to={first.href} className="button">
            Start with {first.title} <span aria-hidden="true">→</span>
          </Link>
          <button type="button" className="quiz-secondary-button" onClick={onStartOver}>
            Start over
          </button>
        </div>

        {others.length > 0 && (
          <>
            <h2 className="quiz-subheading">Other units</h2>
            <ul className="quiz-others">
              {others.map((unit) => (
                <li key={unit.slug}>
                  <Link to={unit.href}>{unit.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="quiz-note">
          Your answers stay in this browser so you can come back to your results. We don’t ask for
          your name, email or anything else that identifies you.
        </p>
      </div>
    </>
  );
}

export default function Quiz() {
  // step 0 = intro, 1..QUESTION_COUNT = questions, after that = results
  const [step, setStep] = useState(() => loadProgress().step);
  const [answers, setAnswers] = useState(() => loadProgress().answers);
  const headingRef = useRef(null);

  const questions = getQuestions(answers.audience);
  const question = step >= 1 && step <= questions.length ? questions[step - 1] : null;
  const showResults = step > QUESTION_COUNT && Boolean(answers.audience);

  const ranking = answers.taskRanking ?? [];

  useEffect(() => {
    try {
      sessionStorage.setItem(
        QUIZ_STORAGE_KEY,
        JSON.stringify({ step, answers, done: step > QUESTION_COUNT })
      );
    } catch {
      // Ignore storage errors; the quiz still works without saved progress.
    }
  }, [step, answers]);

  // Move focus to the new heading on each step so screen readers announce it.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  function pick(optionId) {
    setAnswers((previous) => {
      const updated = { ...previous, [question.id]: optionId };
      // A new audience changes question 2, so its old answer no longer applies.
      if (question.id === "audience" && previous.audience !== optionId) {
        for (const id of AUDIENCE_DEPENDENT) delete updated[id];
      }
      return updated;
    });
  }

  function rankTask(taskId) {
    setAnswers((previous) => {
      const current = previous.taskRanking ?? [];
      const nextRanking = current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId];
      return { ...previous, taskRanking: nextRanking };
    });
  }

  function clearRanking() {
    setAnswers((previous) => ({ ...previous, taskRanking: [] }));
  }

  function startOver() {
    setAnswers({});
    setStep(0);
  }

  // What the Next button allows and says for the current question.
  let canContinue = true;
  let nextLabel = "Next question";
  if (question?.kind === "rank") {
    if (ranking.length === 0) nextLabel = "Skip question";
  } else if (question) {
    const answered = Boolean(answers[question.id]);
    if (question.required && !answered) {
      canContinue = false;
      nextLabel = "Choose one to continue";
    } else if (!answered) nextLabel = "Skip question";
  }
  if (canContinue && step === QUESTION_COUNT) nextLabel = "See my recommendations";

  const timeLeft = step <= 2 ? "About 2 minutes" : "About 1 minute left";

  return (
    <section className="quiz-page">
      <div className="quiz-card">
        {step === 0 && (
          <>
            <CardBand title="Find your starting point" note="About 2 minutes" />
            <div className="quiz-body">
              <h1 className="quiz-title">Find the Right Units for You</h1>
              <p className="quiz-lede">
                With {unitCount} units to choose from, it can be hard to know where to start.
                Answer {QUESTION_COUNT} short questions about who you are and how you use AI, and
                we’ll recommend the units that fit you best.
              </p>
              <ul className="quiz-facts">
                <li>{QUESTION_COUNT} short questions</li>
                <li>No account needed</li>
                <li>Questions fit who you are</li>
              </ul>
              <div className="quiz-actions">
                <button type="button" className="button" onClick={() => setStep(1)}>
                  Start the questions <span aria-hidden="true">→</span>
                </button>
                <Link to="/curriculum" className="quiz-text-link">
                  Browse all units instead
                </Link>
              </div>
            </div>
          </>
        )}

        {question && (
          <>
            <CardBand title="Find your starting point" note={timeLeft} />
            <div className="quiz-body">
              <Progress step={step} />

              <fieldset className="quiz-question">
                <legend>
                  {question.tag && <p className="quiz-role-tag">{question.tag}</p>}
                  <h1 ref={headingRef} tabIndex={-1} className="quiz-question-title">
                    {question.text}
                  </h1>
                  {question.help && <p className="quiz-help">{question.help}</p>}
                </legend>

                {question.kind === "audience" && (
                  <AudienceOptions question={question} value={answers.audience} onPick={pick} />
                )}
                {question.kind === "single" && (
                  <SingleOptions question={question} value={answers[question.id]} onPick={pick} />
                )}
                {question.kind === "rank" && (
                  <RankOptions question={question} ranking={ranking} onRank={rankTask} />
                )}
              </fieldset>

              <div className="quiz-nav">
                <div className="quiz-nav-left">
                  <button type="button" className="quiz-back" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                  {question.kind === "rank" && ranking.length > 0 && (
                    <button type="button" className="quiz-clear" onClick={clearRanking}>
                      Clear ranking
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="button"
                  disabled={!canContinue}
                  onClick={() => setStep(step + 1)}
                >
                  {nextLabel} {canContinue && <span aria-hidden="true">→</span>}
                </button>
              </div>
            </div>
          </>
        )}

        {showResults && (
          <Results answers={answers} headingRef={headingRef} onStartOver={startOver} />
        )}
      </div>
    </section>
  );
}
