import { useEffect, useState } from "react"
import { technologies } from "../data/technologies.js"

{ /* Carousel pattern taken from Geeks for Geeks, https://www.geeksforgeeks.org/reactjs/building-a-carousel-component-with-react-hooks/ */ }

export default function HowWeWorkWithAI() {
    const [currIndex, setCurrIndex] = useState(0);

    useEffect (() => {
        const interval = setInterval(() => {
            setCurrIndex((prevIndex) =>
                prevIndex === technologies.length - 1 
                ? 0 
                : prevIndex + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [technologies.length])

    const nextSlide = () => {
        setCurrIndex((prevIndex) => 
            prevIndex === technologies.length - 1 
            ? 0 
            : prevIndex + 1
        );
    }

    const prevSlide = () => {
        setCurrIndex((prevIndex) =>
            prevIndex === 0 
            ? technologies.length - 1 
            : prevIndex - 1
        );
    }

    return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="section-container">
          <p className="eyebrow">Seeds of Success</p>

          <h1>How We Work With AI</h1>

          <p className="hero-description">
            Our focus will always be on people, and our approach
            to artificial intelligence reflects that commitment.
            We believe in using AI to support the work of nonprofits
            and the people within them, not to replace them.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="content-section">
        <div className="section-container">
          <p className="eyebrow">Our Philosophy</p>

          <h2>AI for Access, Not Creation</h2>

          <p>
            Seeds of Success's focus will always be on
            people. Our philosophy, "AI for access, not creation,"
            means using AI to make information more accessible
            and facilitate the work of nonprofits and the humans
            within them, rather than doing their work for them.
          </p>

          <p>
            Our approach is guided by four principles:
            transparency, human oversight, privacy, and
            responsible use.
          </p>
        </div>
      </section>

      {/* Responsible AI Principles */}
      <section className="content-section alternate">
        <div className="section-container">
          <p className="eyebrow">Our Guiding Principles</p>

          <div className="principles-grid">
            <article className="principle-card">
              <span className="principle-number">01</span>
              <h2>Transparency</h2>
              <p>
                Be clear about when artificial intelligence is
                being used and how it contributes to the work.
              </p>
            </article>

            <article className="principle-card">
              <span className="principle-number">02</span>
              <h2>Human Oversight</h2>
              <p>
                AI should support human judgment rather than
                replace thoughtful human decision-making.
              </p>
            </article>

            <article className="principle-card">
              <span className="principle-number">03</span>
              <h2>Privacy</h2>
              <p>
                Consider what information should and should
                not be shared with artificial intelligence systems.
              </p>
            </article>

            <article className="principle-card">
              <span className="principle-number">04</span>
              <h2>Responsible Use</h2>
              <p>
                Evaluate AI-generated information and understand
                the limitations of AI systems.
              </p>
            </article>
          </div>
        </div>
      </section>
      
      {/* AI Technologies */}
      <section className="content-section">
        <div className="section-container">
          <p className="eyebrow">Our Technology</p>

          <h2>Putting Our Philosophy Into Practice</h2>

          <p>
            We have implemented several technologies that
            reflect our commitment to using AI to support
            people and improve access to information.
          </p>
        </div>

        <div className="carousel-container">
          <button className="carousel-button prev"
                onClick={prevSlide}
          >
            ←
          </button>
            <div className="carousel">
                {technologies.map((technology, index) => (
                    <div
                        key={index}
                        className={
                            index === currIndex ? "carousel-card active" : "carousel-card" 
                        }>
                          <p className="eyebrow"> { technology.alias } </p>
                          <h2>{ technology.title }</h2>
                          <p> { technology.description } </p>
                    </div>
                ))}
            </div>
          <button className="carousel-button next"
                onClick={nextSlide}
          >
            →
          </button>
        </div>
      </section>

      {/* White Paper */}
      <section className="content-section alternate">
        <div className="section-container">
          <p className="eyebrow">Learn More</p>

          <h2>Read Our White Paper</h2>

          <p>
            For a fuller understanding of our philosophy,
            technologies, and approach to responsible AI,
            please refer to our full white paper.
          </p>

          <span className="button" aria-disabled="true">
            White Paper — Coming Soon
          </span>
        </div>
      </section>
    </>
  );
}
