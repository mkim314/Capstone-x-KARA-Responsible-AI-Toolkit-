import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { choicesFor, knowledgeChecks, loadScores, saveScore, sectionId } from "../data/knowledgeCheck";
import "../styles/learning-theme.css";
import "./KnowledgeCheck.css";

function scrollToSection(unitSlug, heading) {
  const target = document.getElementById(sectionId(unitSlug, heading));
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

function QuestionIcon() {
  return (
    <span className="kc-icon" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14" />
        <path d="M12 17.5h.01" />
      </svg>
    </span>
  );
}

function scoreHeadline(correct, total) {
  if (correct === total) return `All ${total} correct. Well done.`;
  if (correct * 2 >= total) return `Nice work. ${correct} of ${total} correct.`;
  return `${correct} of ${total} correct. A second look will help.`;
}

function scoreMessage(correct, total) {
  if (correct === total) return "You’ve got this unit down. Keep going with the next one.";
  if (correct * 2 >= total) {
    return total - correct === 1
      ? "You’ve got the main ideas. One question is worth a second look before you move on."
      : "You’ve got the main ideas. A few questions are worth a second look before you move on.";
  }
  return "Low first scores are common. Review the sections below, then try again.";
}

// The check shown at the end of a unit. `next` is the following unit, if any.
export default function KnowledgeCheck({ unit, next, onOpen }) {
  const questions = knowledgeChecks[unit.slug];
  const [index, setIndex] = useState(0);
  // The choice picked for each question answered so far, in order.
  const [picks, setPicks] = useState([]);
  const [finished, setFinished] = useState(false);
  const [record, setRecord] = useState(() => loadScores()[unit.slug] ?? null);
  const questionRef = useRef(null);
  const scoreRef = useRef(null);

  // Move focus to the new question or the score so screen readers announce it.
  function focusSoon(ref) {
    setTimeout(() => ref.current?.focus(), 0);
  }

  if (!questions?.length) return null;

  const total = questions.length;
  const question = questions[index];
  const picked = picks[index];
  const answered = picked !== undefined;
  const isRight = answered && picked === question.correct;
  const results = picks.map((choice, i) => choice === questions[i].correct);
  const correctCount = results.filter(Boolean).length;

  function choose(choice) {
    if (answered) return;
    setPicks((previous) => [...previous, choice]);
  }

  function goNext() {
    if (index + 1 < total) {
      setIndex(index + 1);
      focusSoon(questionRef);
      return;
    }
    setRecord(saveScore(unit.slug, correctCount, total));
    setFinished(true);
    focusSoon(scoreRef);
  }

  function tryAgain() {
    setIndex(0);
    setPicks([]);
    setFinished(false);
    focusSoon(questionRef);
  }

  return (
    <section className="kc" aria-labelledby={`kc-title-${unit.slug}`}>
      <div className="kc-header">
        <div className="kc-heading">
          <QuestionIcon />
          <div>
            <h4 id={`kc-title-${unit.slug}`}>Test Your Knowledge</h4>
            <p>
              {total} quick questions on this unit
              {record && !finished ? ` · Your best: ${record.best} of ${record.total}` : ""}
            </p>
          </div>
        </div>
        {!finished && (
          <div className="kc-counter">
            <p>
              Question {index + 1} <span>of {total}</span>
            </p>
            <div className="kc-segments" aria-hidden="true">
              {questions.map((q, i) => {
                let state = "";
                if (i < results.length) state = results[i] ? "right" : "wrong";
                else if (i === index) state = "current";
                return <span key={q.id} className={state} />;
              })}
            </div>
          </div>
        )}
      </div>

      {!finished ? (
        <div className="kc-body">
          <p className="kc-question" id={`kc-q-${question.id}`} ref={questionRef} tabIndex={-1}>
            {question.question}
          </p>
          <div className="kc-choices" role="group" aria-labelledby={`kc-q-${question.id}`}>
            {choicesFor(question).map((choice) => {
              const isCorrect = choice === question.correct;
              const isPicked = choice === picked;
              let state = "";
              if (answered && isCorrect) state = "right";
              else if (answered && isPicked) state = "wrong";
              else if (answered) state = "muted";
              return (
                <button
                  key={choice}
                  type="button"
                  className={`kc-choice ${state}`}
                  aria-disabled={answered}
                  onClick={() => choose(choice)}
                >
                  <span className="kc-mark" aria-hidden="true">
                    {state === "right" ? "✓" : state === "wrong" ? "✕" : ""}
                  </span>
                  <span className="kc-choice-text">{choice}</span>
                  {state === "wrong" && <span className="kc-tag">Your answer</span>}
                  {state === "right" && <span className="kc-tag">{isPicked ? "Your answer · Correct" : "Correct answer"}</span>}
                </button>
              );
            })}
          </div>

          <div aria-live="polite">
            {answered && (
              <div className={isRight ? "kc-feedback right" : "kc-feedback wrong"}>
                <p className="kc-feedback-title">{isRight ? "Correct." : "Not quite."}</p>
                <p>{question.explanation}</p>
                <button
                  type="button"
                  className="kc-link"
                  onClick={() => scrollToSection(unit.slug, question.section)}
                >
                  Review: {question.section}
                </button>
              </div>
            )}
          </div>

          <div className="kc-footer">
            <p>You can retake this check any time.</p>
            <button type="button" className="button" disabled={!answered} onClick={goNext}>
              {index + 1 < total ? "Next question" : "See my score"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="kc-body">
          <div className="kc-score">
            <div
              className="kc-ring"
              style={{ "--kc-fill": `${(correctCount / total) * 360}deg` }}
              aria-hidden="true"
            >
              <div>
                <strong>
                  {correctCount}/{total}
                </strong>
                <span>correct</span>
              </div>
            </div>
            <div className="kc-score-text">
              <p className="kc-score-headline" ref={scoreRef} tabIndex={-1}>
                {scoreHeadline(correctCount, total)}
              </p>
              <p>{scoreMessage(correctCount, total)}</p>
              {record && (
                <div className="kc-score-pills">
                  <span>
                    <strong>First try:</strong> {record.first} of {record.total}
                  </span>
                  <span>
                    <strong>Best:</strong> {record.best} of {record.total}
                  </span>
                </div>
              )}
            </div>
          </div>

          <ol className="kc-summary">
            {questions.map((q, i) => (
              <li key={q.id}>
                <span className={results[i] ? "kc-dot right" : "kc-dot wrong"} aria-hidden="true">
                  {results[i] ? "✓" : "✕"}
                </span>
                <span className="kc-summary-text">
                  {i + 1}. {q.question}
                </span>
                <span className={results[i] ? "kc-summary-result right" : "kc-summary-result wrong"}>
                  {results[i] ? "Correct" : "Missed"}
                </span>
              </li>
            ))}
          </ol>

          {correctCount < total && (
            <div className="kc-review">
              <p className="kc-feedback-title">Worth a second look</p>
              <ul>
                {questions
                  .filter((q, i) => !results[i])
                  .map((q) => (
                    <li key={q.id}>
                      <button type="button" className="kc-link" onClick={() => scrollToSection(unit.slug, q.section)}>
                        Review: {q.section}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="kc-actions">
            {next && (
              <button type="button" className="button" onClick={() => onOpen(next.slug)}>
                Next: {next.title} <span aria-hidden="true">→</span>
              </button>
            )}
            <button type="button" className="kc-secondary" onClick={tryAgain}>
              Try again
            </button>
            <Link to="/progress" className="kc-progress-link">
              View my progress
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
