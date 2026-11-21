function Curriculum() {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <p className="eyebrow">Curriculum</p>

          <h1>Responsible AI Curriculum</h1>

          <p className="hero-description">
            Explore lessons and resources designed to help users understand
            responsible approaches to artificial intelligence.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-container">
          <div className="module-list">

            <article className="module-card">
              <p className="module-number">Module 01</p>

              <h2>Introduction to Responsible AI</h2>

              <p>
                Learn what responsible AI means and why responsible use matters.
              </p>

              <button className="button secondary-button">
                View Module
              </button>
            </article>

            <article className="module-card">
              <p className="module-number">Module 02</p>

              <h2>Responsible AI Principles</h2>

              <p>
                Explore concepts including transparency, fairness, privacy,
                accountability, and human oversight.
              </p>

              <button className="button secondary-button">
                View Module
              </button>
            </article>

            <article className="module-card">
              <p className="module-number">Module 03</p>

              <h2>Applying Responsible AI</h2>

              <p>
                Consider how responsible AI principles can be applied in
                real-world situations.
              </p>

              <button className="button secondary-button">
                View Module
              </button>
            </article>

          </div>
        </div>
      </section>
    </>
  );
}

export default Curriculum;