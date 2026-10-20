import { useState } from "react";
import { curriculum } from "../data/curriculum";
import "./Curriculum.css";

export default function Curriculum() {
  const [layout, setLayout] = useState("sidebar");
  const [activeCategory, setActiveCategory] = useState(curriculum[0].slug);
  const [expanded, setExpanded] = useState(curriculum[0].slug);
  const selected = curriculum.find((group) => group.slug === activeCategory) || curriculum[0];

  function openCategory(slug) {
    setActiveCategory(slug);
    setExpanded(slug);
  }

  function Topic({ topic }) {
    return (
      <article className="rat-topic" key={topic.slug}>
        <span className="rat-unit">{topic.unit}</span>
        <div>
          <h4>{topic.title}</h4>
          <p>{topic.description}</p>
          {/* Replace this placeholder once the B1–B9 lesson pages are built. */}
          <span className="rat-lesson-status">Lesson page coming soon</span>
        </div>
      </article>
    );
  }

  return (
    <section className="rat-curriculum" id="curriculum" aria-labelledby="rat-curriculum-title">
      <div className="rat-wrap">
        <p className="rat-eyebrow">KARA × Seeds of Success</p>
        <h2 id="rat-curriculum-title">Responsible AI Curriculum</h2>
        <p className="rat-intro">
          Practical, approachable lessons for working with AI thoughtfully,
          from responsible-use basics to prompts and everyday workflows.
        </p>

        <div className="rat-layout-picker" role="group" aria-label="Curriculum layout">
          <span>Preview design:</span>
          <button type="button" aria-pressed={layout === "sidebar"} onClick={() => setLayout("sidebar")}>
            Sidebar navigation
          </button>
          <button type="button" aria-pressed={layout === "cards"} onClick={() => setLayout("cards")}>
            Category cards
          </button>
        </div>

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
                {selected.topics.map((topic) => <Topic key={topic.slug} topic={topic} />)}
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
                    {category.topics.map((topic) => <Topic key={topic.slug} topic={topic} />)}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
