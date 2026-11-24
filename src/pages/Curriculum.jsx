import { useEffect, useState } from "react";
import { curriculum } from "../data/curriculum";
import { sectionId } from "../data/knowledgeCheck";
import KnowledgeCheck from "../components/KnowledgeCheck";
import "./Curriculum.css";

const HASH_PREFIX = "#curriculum/";

// Flat, ordered list of every unit with its category attached.
const allUnits = curriculum.flatMap((category) =>
  category.topics.map((topic) => ({ ...topic, category }))
);

function Topic({ topic, onOpen }) {
  return (
    <article className="rat-topic clickable" onClick={() => onOpen(topic.slug)}>
      <span className="rat-unit">{topic.unit}</span>
      <div>
        <h4>
          <button
            type="button"
            className="rat-topic-link"
            onClick={(e) => { e.stopPropagation(); onOpen(topic.slug); }}
          >
            {topic.title}
          </button>
        </h4>
        <p>{topic.description}</p>
        <button
          type="button"
          className="rat-topic-open"
          aria-label={`View unit ${topic.unit}: ${topic.title}`}
          onClick={(e) => { e.stopPropagation(); onOpen(topic.slug); }}
        >
          View unit →
        </button>
      </div>
    </article>
  );
}

function Walkthrough({ unit, onClose }) {
  const { scenario, steps } = unit.walkthrough;
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = steps[step];
  const last = step === steps.length - 1;

  function go(next) {
    setStep(next);
    setCopied(false);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(current.prompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rat-walkthrough" aria-label={`Practical example for ${unit.title}`}>
      <p className="rat-eyebrow">Practical example</p>
      <p className="rat-walk-scenario">{scenario}</p>
      <div className="rat-walk-progress" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Example progress">
        {steps.map((s, i) => <span key={s.title} className={i <= step ? "done" : undefined} />)}
      </div>
      <div className="rat-walk-step" aria-live="polite">
        <p className="rat-walk-count">Step {step + 1} of {steps.length}</p>
        <h4>{current.title}</h4>
        <p>{current.body}</p>
        {current.prompt && (
          <div className="rat-walk-prompt">
            <pre>{current.prompt}</pre>
            <button type="button" onClick={copyPrompt}>{copied ? "Copied" : "Copy"}</button>
          </div>
        )}
      </div>
      <div className="rat-walk-controls">
        <button type="button" onClick={() => go(step - 1)} disabled={step === 0}>← Previous step</button>
        <button type="button" className="primary" onClick={last ? onClose : () => go(step + 1)}>
          {last ? "Finish example" : "Next step →"}
        </button>
        <button type="button" className="link" onClick={onClose}>Close example</button>
      </div>
    </section>
  );
}


function UnitDetail({ unit, onBack, onOpen }) {
  const index = allUnits.findIndex((u) => u.slug === unit.slug);
  const prev = allUnits[index - 1];
  const next = allUnits[index + 1];

  const [walking, setWalking] = useState(false);

  return (
    <div className="rat-detail" aria-live="polite">
      <button type="button" className="rat-back" onClick={onBack}>
        ← Back to curriculum
      </button>
      <header className="rat-detail-header">
        <span className="rat-unit">{unit.unit}</span>
        <div>
          <p className="rat-eyebrow">Curriculum / {unit.category.title}</p>
          <h3>{unit.title}</h3>
        </div>
      </header>
      {unit.sections ? (
        <>
          <p className="rat-detail-lede">{unit.description}</p>
          {unit.sections.map((section) => (
            <section
              className="rat-detail-section"
              key={section.heading}
              id={sectionId(unit.slug, section.heading)}
              tabIndex={-1}
            >
              <h4>{section.heading}</h4>
              <p>{section.body}</p>
            </section>
          ))}
        </>
      ) : (
        <>
          <section className="rat-detail-section">
            <h4>Overview</h4>
            <p>{unit.description}</p>
          </section>
          <section className="rat-detail-section">
            <h4>Lesson</h4>
            {/* Units without a `sections` array in curriculum.js show this placeholder. */}
            <span className="rat-lesson-status">Lesson page coming soon</span>
          </section>
        </>
      )}
      {unit.walkthrough && (
        <section className="rat-walk-detail-section">
          {walking ? (
            <Walkthrough unit={unit} onClose={() => setWalking(false)} />
          ) : (
            <>
              <h4 className="rat-example-title">Practical example</h4>
              <p className="rat-example-description">
                See this unit applied step by step.
              </p>
              <button type="button" className="rat-walk-start" onClick={() => setWalking(true)}>
                Walk me through an example
              </button>
            </>
          )}
        </section>
      )}
      <KnowledgeCheck key={unit.slug} unit={unit} next={next} onOpen={onOpen} />
      <nav className="rat-detail-nav" aria-label="Neighboring units">
        {prev && (
          <button type="button" onClick={() => onOpen(prev.slug)}>
            <small>← Previous unit</small>
            {prev.unit}: {prev.title}
          </button>
        )}
        {next && (
          <button type="button" className="next" onClick={() => onOpen(next.slug)}>
            <small>Next unit →</small>
            {next.unit}: {next.title}
          </button>
        )}
      </nav>
    </div>
  );
}

export default function Curriculum() {
  const [layout, setLayout] = useState("sidebar");
  const [activeCategory, setActiveCategory] = useState(curriculum[0].slug);
  const [expanded, setExpanded] = useState(curriculum[0].slug);
  const [activeUnit, setActiveUnit] = useState(null);
  const selected = curriculum.find((group) => group.slug === activeCategory) || curriculum[0];
  const unit = allUnits.find((u) => u.slug === activeUnit) || null;

  // Keep the open unit in sync with the URL hash so units can be linked to and the back button works.
  useEffect(() => {
    function readHash() {
      const hash = window.location.hash;
      const slug = hash.startsWith(HASH_PREFIX) ? decodeURIComponent(hash.slice(HASH_PREFIX.length)) : null;
      const match = allUnits.find((u) => u.slug === slug);
      if (match) {
        setActiveUnit(match.slug);
        setActiveCategory(match.category.slug);
        setExpanded(match.category.slug);
      } else {
        setActiveUnit(null);
      }
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  function scrollToTop() {
    document.getElementById("curriculum")?.scrollIntoView({ block: "start" });
  }

  function openCategory(slug) {
    setActiveCategory(slug);
    setExpanded(slug);
    if (activeUnit) closeUnit();
  }

  function openUnit(slug) {
    window.location.hash = HASH_PREFIX + encodeURIComponent(slug);
    scrollToTop();
  }

  function closeUnit() {
    window.location.hash = "curriculum";
    scrollToTop();
  }

  return (
    <section className="rat-curriculum" id="curriculum" aria-labelledby="rat-curriculum-title">
      <div className="rat-wrap">
        <p className="rat-eyebrow"> Seeds of Success </p>
        <h2 id="rat-curriculum-title">Responsible AI Curriculum</h2>
        <p className="rat-intro">
          Practical, approachable lessons for working with AI thoughtfully,
          from responsible-use basics to prompts and everyday workflows.
        </p>

        {unit ? (
          <UnitDetail key={unit.slug} unit={unit} onBack={closeUnit} onOpen={openUnit} />
        ) : (
          <>
          {/*
            <div className="rat-layout-picker" role="group" aria-label="Curriculum layout">
              <span>Preview design:</span>
              <button type="button" aria-pressed={layout === "sidebar"} onClick={() => setLayout("sidebar")}>
                Sidebar navigation
              </button>
              <button type="button" aria-pressed={layout === "cards"} onClick={() => setLayout("cards")}>
                Category cards
              </button>
            </div>
          */}
            {layout === "sidebar" ? (
              <div className="rat-sidebar-layout">
                <aside className="rat-sidebar" aria-label="Curriculum categories">
                  <h3>Curriculum</h3>
                  {curriculum.map((category) => (
                    <button
                      key={category.slug}
                      type="button"
                      className={activeCategory === category.slug ? "rat-category-button active" : "rat-category-button"}
                      aria-current={activeCategory === category.slug ? "true" : undefined}
                      onClick={() => openCategory(category.slug)}
                    >
                      <span>{category.title}</span>
                      <small>{category.topics.length} {category.topics.length === 1 ? "lesson" : "lessons"}</small>
                    </button>
                  ))}
                </aside>
                <div className="rat-content" aria-live="polite">
                  <p className="rat-eyebrow">Curriculum / {selected.title}</p>
                  <h3>{selected.title}</h3>
                  <p className="rat-group-count">{selected.topics.length} {selected.topics.length === 1 ? "lesson" : "lessons"} in this section</p>
                  <div className="rat-topic-list">
                    {selected.topics.map((topic) => <Topic key={topic.slug} topic={topic} onOpen={openUnit} />)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rat-accordion">
                {curriculum.map((category) => (
                  <section className="rat-accordion-group" key={category.slug}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={expanded === category.slug}
                        onClick={() => setExpanded(expanded === category.slug ? null : category.slug)}
                      >
                        <span className="rat-accordion-heading">{category.title}</span>
                        <span className="rat-accordion-meta">{category.topics.length} {category.topics.length === 1 ? "lesson" : "lessons"}</span>
                        <span aria-hidden="true">{expanded === category.slug ? "−" : "+"}</span>
                      </button>
                    </h3>
                    {expanded === category.slug && (
                      <div className="rat-accordion-body">
                        {category.topics.map((topic) => <Topic key={topic.slug} topic={topic} onOpen={openUnit} />)}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
