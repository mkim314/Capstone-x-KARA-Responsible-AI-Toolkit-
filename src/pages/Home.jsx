import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">KARA × Seeds of Success</p>

          <h1>Responsible AI Toolkit</h1>

          <p className="hero-description">
            Tools and guidance for understanding and using artificial
            intelligence responsibly.
          </p>

          <Link to="/curriculum" className="button">
            Explore the Curriculum
          </Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-container">
          <p className="eyebrow">About the Toolkit</p>

          <h2>What is the Responsible AI Toolkit?</h2>

          <p className="section-description">
            The Responsible AI Toolkit provides practical resources for
            understanding responsible approaches to artificial intelligence.
            It is designed to help users learn how AI can be used thoughtfully,
            transparently, and with appropriate human oversight.
          </p>
        </div>
      </section>

      <section className="content-section alternate">
        <div className="section-container">
          <p className="eyebrow">Explore</p>

          <h2>Explore the Toolkit</h2>

          <div className="card-grid">
            <div className="feature-card">
              <h3>Curriculum</h3>

              <p>
                Explore lessons and resources designed to introduce the
                principles of responsible AI.
              </p>

              <Link to="/curriculum" className="text-link">
                View Curriculum →
              </Link>
            </div>

            <div className="feature-card">
              <h3>How We Work With AI</h3>

              <p>
                Learn about the principles that guide how artificial
                intelligence is used within this project.
              </p>

              <Link to="/how-we-work-with-ai" className="text-link">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;