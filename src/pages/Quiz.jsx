import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MAX_RANKED,
  QUESTION_COUNT,
  QUIZ_STORAGE_KEY,
  ROLE_DEPENDENT,
  getQuestions,
  recommend,
  stepNotes,
  unitCount,
} from "../data/quiz";
import "./Quiz.css";

// Progress is kept for this browser tab only, so returning from a recommended
// unit with the Back button shows the results again. Nothing is sent anywhere.
function loadProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(QUIZ_STORAGE_KEY));
    if (saved && Number.isInteger(saved.step) && saved.answers) {
      // Every question after the first depends on the role.
      if (!saved.answers.role?.length) return { step: Math.min(saved.step, 1), answers: {} };
      return saved;
    }
  } catch {
    // Storage can be unavailable (private windows, blocked storage); start fresh.
  }
  return { step: 0, answers: {} };
}

// Stroke icons for the role options (24px grid, drawn with currentColor).
const ICON_PATHS = {
  book: (
    <>
      <path d="M2 6h7a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H2z" />
      <path d="M22 6h-7a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h8z" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M9 7V4h6v3" />
      <path d="M3 12h18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
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

function RoleOptions({ question, selected, onPick }) {
  return (
    <div className="quiz-role-grid">
      {question.options.map((role) => {
        const isOn = selected.includes(role.id);
        return (
          <button
            key={role.id}
            type="button"
            aria-pressed={isOn}
            className={isOn ? "quiz-role selected" : "quiz-role"}
            onClick={() => onPick(role.id)}
          >
            <span className="quiz-role-icon">
              <Icon name={role.icon} />
            </span>
            <span className="quiz-option-text">
              <span className="quiz-option-label">{role.label}</span>
              <span className="quiz-option-detail">{role.detail}</span>
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

function SingleOptions({ question, selected, onPick }) {
  return question.options.map((option) => {
    const isOn = selected.includes(option.id);
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

function RankOptions({ question, selected, onPick }) {
  const labelFor = (id) => question.options.find((option) => option.id === id)?.label ?? "";
  return (
    <>
      <div className="quiz-rank-slots" aria-hidden="true">
        {Array.from({ length: MAX_RANKED }, (_, index) => {
          const id = selected[index];
          return id ? (
            <span key={index} className="quiz-rank-slot filled">
              <span className="quiz-rank-number">{index + 1}</span>
              <span className="quiz-rank-slot-text">{labelFor(id)}</span>
            </span>
          ) : (
            <span key={index} className="quiz-rank-slot">
              <span className="quiz-rank-number">{index + 1}</span>
              {index === selected.length ? "Your next pick" : "Open"}
            </span>
          );
        })}
      </div>
      <p className="quiz-visually-hidden" aria-live="polite">
        {selected.length} of {MAX_RANKED} ranked
      </p>
      {question.options.map((option) => {
        const rank = selected.indexOf(option.id) + 1;
        const isFull = rank === 0 && selected.length >= MAX_RANKED;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={rank > 0}
            aria-label={rank > 0 ? `${option.label}, ranked ${rank}` : `${option.label}, not ranked`}
            disabled={isFull}
            className={rank > 0 ? "quiz-option quiz-rank-option selected" : "quiz-option quiz-rank-option"}
            onClick={() => onPick(option.id)}
          >
            <span className={rank > 0 ? "quiz-rank-circle on" : "quiz-rank-circle"} aria-hidden="true">
              {rank > 0 ? rank : ""}
            </span>
            <span className="quiz-option-label">{option.label}</span>
          </button>
        );
      })}
    </>
  );
}

function Results({ answers, headingRef, onStartOver }) {
  const { role, start, picks, others } = recommend(answers);
  const steps = [
    { unit: start.unit, reason: start.reason, isStart: true },
    ...picks.map((pick) => ({ ...pick, isStart: false })),
  ];

  return (
    <>
      <CardBand title="Your starting point" note={`All ${QUESTION_COUNT} questions answered`} />
      <div className="quiz-body">
        {role && (
          <p className="quiz-role-tag">
            <Icon name={role.icon} size={16} />
            <span>{role.audience.charAt(0).toUpperCase() + role.audience.slice(1)}</span>
          </p>
        )}
        <h1 ref={headingRef} tabIndex={-1} className="quiz-title">
          Your Recommended Units
        </h1>
        <p className="quiz-lede">
          {role ? (
            <>
              Recommended for <strong>{role.audience}</strong>.{" "}
            </>
          ) : null}
          Each recommendation shows the answer it came from.
        </p>

        <ol className="quiz-path">
          {steps.map(({ unit, reason, isStart }, index) => (
            <li key={unit.slug} className={isStart ? "quiz-path-step start" : "quiz-path-step"}>
              <span className="quiz-path-marker" aria-hidden="true">
                <span className="quiz-path-number">{index + 1}</span>
              </span>
              <div className="quiz-path-card">
                {isStart ? (
                  <span className="quiz-badge">Start here</span>
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
          <Link to={start.unit.href} className="button">
            Start with {start.unit.title} <span aria-hidden="true">→</span>
          </Link>
          <button type="button" className="quiz-secondary-button" onClick={onStartOver}>
            Start over
          </button>
        </div>

        <h2 className="quiz-subheading">Other units</h2>
        <ul className="quiz-others">
          {others.map((unit) => (
            <li key={unit.slug}>
              <Link to={unit.href}>{unit.title}</Link>
            </li>
          ))}
        </ul>
        <p className="quiz-note">We don’t ask for your name or email.</p>
      </div>
    </>
  );
}

export default function Quiz() {
  // step 0 = intro, 1..QUESTION_COUNT = questions, after that = results
  const [step, setStep] = useState(() => loadProgress().step);
  const [answers, setAnswers] = useState(() => loadProgress().answers);
  const headingRef = useRef(null);

  const roleId = answers.role?.[0];
  const questions = getQuestions(roleId);
  const question = step >= 1 && step <= questions.length ? questions[step - 1] : null;
  const selected = question ? (answers[question.id] ?? []) : [];
  const showResults = step > QUESTION_COUNT && Boolean(roleId);

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
      const current = previous[question.id] ?? [];
      let next;
      if (question.kind === "rank") {
        if (current.includes(optionId)) next = current.filter((id) => id !== optionId);
        else if (current.length < MAX_RANKED) next = [...current, optionId];
        else next = current;
      } else {
        next = [optionId];
      }
      const updated = { ...previous, [question.id]: next };
      // A new role changes questions 2, 4 and 5, so their old answers no longer apply.
      if (question.id === "role" && current[0] !== optionId) {
        for (const id of ROLE_DEPENDENT) delete updated[id];
      }
      return updated;
    });
  }

  function clearCurrent() {
    setAnswers((previous) => ({ ...previous, [question.id]: [] }));
  }

  function startOver() {
    setAnswers({});
    setStep(0);
  }

  const timeLeft = step <= 2 ? "About 2 minutes" : "About 1 minute left";
  let nextLabel = "Next question";
  if (question?.required && selected.length === 0) nextLabel = "Choose one to continue";
  else if (selected.length === 0) nextLabel = "Skip question";
  else if (step === QUESTION_COUNT) nextLabel = "See my recommendations";

  return (
    <section className="quiz-page">
      <div className="quiz-card">
        {step === 0 && (
          <>
            <CardBand title="Find your starting point" note="About 2 minutes" />
            <div className="quiz-body">
              <h1 className="quiz-title">Find the Right Units for You</h1>
              <p className="quiz-lede">
                With {unitCount} units to choose from, it can be hard to know where to
                start. Answer {QUESTION_COUNT} short questions about your role and how you
                use AI, and we’ll recommend the units that fit you best.
              </p>
              <ul className="quiz-facts">
                <li>{QUESTION_COUNT} short questions</li>
                <li>No account needed</li>
                <li>Questions fit your role</li>
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

                {question.kind === "role" && (
                  <RoleOptions question={question} selected={selected} onPick={pick} />
                )}
                {question.kind === "single" && (
                  <SingleOptions question={question} selected={selected} onPick={pick} />
                )}
                {question.kind === "rank" && (
                  <RankOptions question={question} selected={selected} onPick={pick} />
                )}
              </fieldset>

              <div className="quiz-nav">
                <div className="quiz-nav-left">
                  <button type="button" className="quiz-back" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                  {question.kind === "rank" && selected.length > 0 && (
                    <button type="button" className="quiz-clear" onClick={clearCurrent}>
                      Clear ranking
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="button"
                  disabled={question.required && selected.length === 0}
                  onClick={() => setStep(step + 1)}
                >
                  {nextLabel} {!(question.required && selected.length === 0) && <span aria-hidden="true">→</span>}
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
