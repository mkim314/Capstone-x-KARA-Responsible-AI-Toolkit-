export default function Home() {
  return (
    <main>
      <p>Unit B1</p>
      <h1>Getting Claude To Ask Questions At The Right Time</h1>
      <h2>One process with three parts. For real deliverables, require all clarifying questions up front. For quick tasks, one question maximum. No lazy confirmations.<br /><br /></h2>

      <h3><strong>The clarification gate (for real deliverables)</strong></h3>
      <p>For anything you will actually send or ship, require Claude to ask all clarifying questions in one consolidated message BEFORE generating anything. 
        Jarred's rule, verbatim: 'This is non-negotiable - I will correct you if you skip the clarification gate.'
        The consolidated ask forces Claude to think about what it needs, and it forces you to make the decisions instead of accepting a plausible-sounding first draft.<br /><br /></p>

      <h3><strong>Quick mode (for quick tasks)</strong></h3>
      <p>For fast one-off asks: one clarifying question maximum. State your assumptions. Keep moving.
        The clarification gate is expensive; do not apply it to a five-minute task.<br /><br /></p>

      <h3><strong>No lazy confirmations</strong></h3>
      <p>Claude should research what it can answer for itself before asking. If it is asking you a question a search would answer, correct it.<br /><br /></p>
    </main>
  );
}