import { useState } from "react";
import { Link } from "react-router-dom";
import { allQuizUnits, savedRecommendations } from "../data/quiz";
import { clearScores, knowledgeChecks, loadScores, statusFor } from "../data/knowledgeCheck";
import "../styles/learning-theme.css";
import "./Progress.css";

// Units that have a knowledge check, in curriculum order.
const checkedUnits = allQuizUnits.filter((unit) => knowledgeChecks[unit.slug]?.length);

function ScoreBar({ record, status }) {
  const width = `${Math.round((record.best / record.total) * 100)}%`;
  return (
    <span className="progress-score">
      <span className="progress-bar" aria-hidden="true">
        <span className={`progress-bar-fill ${status}`} style={{ width }} />
      </span>
      {record.best} of {record.total}
    </span>
  );
}

function StatusBadge({ status, unit }) {
  if (status === "complete") {
    return (
      <span className="progress-badge complete">
        <span aria-hidden="true">✓</span> Complete
      </span>
    );
  }
  if (status === "review") {
    return (
      <span className="progress-badge review">
        <span aria-hidden="true">↻</span> Review suggested
      </span>
    );
  }
  return (
    <Link to={unit.href} className="progress-start">
      Start unit <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function Progress() {
  // Read once when the page opens; scores only change on the Curriculum page
  // or with "Clear my scores" below.
  const [scores, setScores] = useState(loadScores);
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  function confirmClear() {
    clearScores();
    setScores({});
    setConfirming(false);
    setCleared(true);
  }
  const [recommended] = useState(savedRecommendations);

  const taken = checkedUnits.filter((unit) => scores[unit.slug]).length;
  const complete = checkedUnits.filter((unit) => statusFor(scores[unit.slug]) === "complete").length;
  const review = checkedUnits.filter((unit) => statusFor(scores[unit.slug]) === "review").length;

  return (
    <section className="progress-page">
      <div className="progress-card">
        <div className="progress-intro">
          <p className="progress-eyebrow">Seeds of Success</p>
          <h1>Your Progress</h1>
          <p className="progress-lede">
            Each unit ends with a short knowledge check. Low first scores are expected; your
            best score updates each time you try again.
          </p>
        </div>

        <div className="progress-tiles">
          <div className="progress-tile">
            <p className="progress-tile-label">Checks taken</p>
            <p className="progress-tile-value">
              {taken} <span>of {checkedUnits.length}</span>
            </p>
            <div className="progress-tile-segments" aria-hidden="true">
              {checkedUnits.map((unit) => (
                <span key={unit.slug} className={scores[unit.slug] ? "on" : ""} />
              ))}
            </div>
          </div>
          <div className="progress-tile complete">
            <p className="progress-tile-label">Complete</p>
            <p className="progress-tile-value">{complete}</p>
            <p className="progress-tile-note">Every question right on a try</p>
          </div>
          <div className="progress-tile review">
            <p className="progress-tile-label">Review suggested</p>
            <p className="progress-tile-value">{review}</p>
            <p className="progress-tile-note">A quick reread will help</p>
          </div>
        </div>

        <div className="progress-table-wrap">
          <table className="progress-table">
            <thead>
              <tr>
                <th scope="col">Unit</th>
                <th scope="col">First try</th>
                <th scope="col">Best score</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {checkedUnits.map((unit) => {
                const record = scores[unit.slug];
                const status = statusFor(record);
                return (
                  <tr key={unit.slug}>
                    <td>
                      <div className="progress-unit-cell">
                        <span className="progress-chip">{unit.slug}</span>
                        <div>
                          <Link to={unit.href} className="progress-unit">
                            {unit.title}
                          </Link>
                          {recommended.includes(unit.slug) && (
                            <span className="progress-recommended">Recommended for you</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{record ? `${record.first} of ${record.total}` : <span className="progress-empty">—</span>}</td>
                    <td>{record ? <ScoreBar record={record} status={status} /> : <span className="progress-empty">—</span>}</td>
                    <td>
                      <StatusBadge status={status} unit={unit} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="progress-footer">
          {recommended.length > 0 ? (
            <Link to="/quiz" className="progress-back">
              <span aria-hidden="true">←</span> Back to my recommended units
            </Link>
          ) : (
            <Link to="/quiz" className="progress-back">
              Find your starting point <span aria-hidden="true">→</span>
            </Link>
          )}
          <p>Scores are saved in this browser only.</p>
        </div>

        <div className="progress-clear" aria-live="polite">
          {confirming ? (
            <>
              <p>Clear every saved score in this browser? This can’t be undone.</p>
              <div className="progress-clear-actions">
                <button type="button" className="progress-clear-confirm" onClick={confirmClear}>
                  Yes, clear my scores
                </button>
                <button type="button" className="progress-clear-cancel" onClick={() => setConfirming(false)}>
                  Cancel
                </button>
              </div>
            </>
          ) : cleared ? (
            <p>Your scores are cleared.</p>
          ) : (
            taken > 0 && (
              <button type="button" className="progress-clear-link" onClick={() => setConfirming(true)}>
                Clear my scores
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
