import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { questions, recommend, unitCount } from "../data/quiz";
import "./Quiz.css";

// Progress is kept for this browser tab only, so returning from a recommended
// unit with the Back button shows the results again. Nothing is sent anywhere.
const STORAGE_KEY = "rat-quiz-progress";

function loadProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.step) && saved.answers) return saved;
  } catch {
    // Storage can be unavailable (private windows, blocked storage); start fresh.
  }
  return { step: 0, answers: {} };
}

function Results({ answers, headingRef, onStartOver }) {
  const { start, picks, others } = recommend(answers);

  return (
    <div className="quiz-body">
      <h1 ref={headingRef} tabIndex={-1} className="quiz-title">
        Your Recommended Units
      </h1>
      <p className="quiz-lede">
        Based on your answers. Each recommendation shows the answer it came from.
      </p>

      <ol className="quiz-results">
        <li>
          <Link to={start.unit.href} className="quiz-result quiz-result-start">
            <span className="quiz-result-number">1</span>
            <span className="quiz-result-text">
              <span className="quiz-result-heading">
                <span className="quiz-result-title">{start.unit.title}</span>
                <span className="quiz-badge">Start here</span>
              </span>
              <span className="quiz-result-reason">{start.reason}</span>
            </span>
          </Link>
        </li>
        {picks.map(({ unit, reason }, index) => (
          <li key={unit.slug}>
            <Link to={unit.href} className="quiz-result">
              <span className="quiz-result-number">{index + 2}</span>
              <span className="quiz-result-text">
                <span className="quiz-result-title">{unit.title}</span>
                <span className="quiz-result-category">{unit.categoryTitle}</span>
                <span className="quiz-result-reason">{reason}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="quiz-subheading">Other units</h2>
      <ul className="quiz-others">
        {others.map((unit) => (
          <li key={unit.slug}>
            <Link to={unit.href}>{unit.title}</Link>
          </li>
        ))}
      </ul>

      <div className="quiz-actions">
        <Link to={start.unit.href} className="button">
          Start with {start.unit.title}
        </Link>
        <button type="button" className="quiz-secondary-button" onClick={onStartOver}>
          Start over
        </button>
      </div>
      <p className="quiz-note">We don’t ask for your name or email.</p>
    </div>
  );
}

export default function Quiz() {
  // step 0 = intro, 1..questions.length = questions, after that = results
  const [step, setStep] = useState(() => loadProgress().step);
  const [answers, setAnswers] = useState(() => loadProgress().answers);
  const headingRef = useRef(null);

  const total = questions.length;
  const question = step >= 1 && step <= total ? questions[step - 1] : null;
  const selected = question ? (answers[question.id] ?? []) : [];

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      // Ignore storage errors; the quiz still works without saved progress.
    }
  }, [step, answers]);

  // Move focus to the new heading on each step so screen readers announce it.
  useEffect(() => {
    if (step > 0) headingRef.current?.focus();
  }, [step]);

  function toggle(optionId) {
    setAnswers((previous) => {
      const current = previous[question.id] ?? [];
      const next = question.multiple
        ? current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId]
        : [optionId];
      return { ...previous, [question.id]: next };
    });
  }

  function startOver() {
    setAnswers({});
    setStep(0);
  }

  return (
    <section className="quiz-page">
      <div className="quiz-card">
        <p className="eyebrow">Responsible AI Toolkit</p>

        {step === 0 && (
          <div className="quiz-body">
            <h1 className="quiz-title">Find the Right Units for You</h1>
            <p className="quiz-lede">
              With {unitCount} units to choose from, it can be hard to know where to
              start. Answer {total} short questions about your role and how you use AI,
              and we’ll recommend the units that fit you best.
            </p>
            <ul className="quiz-facts">
              <li>About 2 minutes</li>
              <li>No account needed</li>
              <li>Skip any question</li>
            </ul>
            <div className="quiz-actions">
              <button type="button" className="button" onClick={() => setStep(1)}>
                Start the questions
              </button>
              <Link to="/curriculum" className="quiz-text-link">
                Browse all units instead
              </Link>
            </div>
          </div>
        )}

        {question && (
          <div className="quiz-body">
            <p className="quiz-progress-label">
              Question {step} of {total}
            </p>
            <div
              className="quiz-progress"
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={step}
            >
              <div className="quiz-progress-fill" style={{ width: `${Math.round((step / total) * 100)}%` }} />
            </div>

            <fieldset className="quiz-question">
              <legend>
                <h1 ref={headingRef} tabIndex={-1} className="quiz-question-title">
                  {question.text}
                </h1>
                {question.help && <p className="quiz-help">{question.help}</p>}
                {question.multiple && <p className="quiz-help">Choose all that apply.</p>}
              </legend>

              {question.options.map((option) => {
                const isOn = selected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isOn}
                    className={isOn ? "quiz-option selected" : "quiz-option"}
                    onClick={() => toggle(option.id)}
                  >
                    <span className="quiz-option-mark" aria-hidden="true">
                      {isOn ? "✓" : ""}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </fieldset>

            <div className="quiz-nav">
              <button type="button" className="quiz-back" onClick={() => setStep(step - 1)}>
                Back
              </button>
              <button type="button" className="button" onClick={() => setStep(step + 1)}>
                {selected.length === 0
                  ? "Skip question"
                  : step === total
                    ? "See my recommendations"
                    : "Next question"}
              </button>
            </div>
          </div>
        )}

        {step > total && (
          <Results answers={answers} headingRef={headingRef} onStartOver={startOver} />
        )}
      </div>
    </section>
  );
}
