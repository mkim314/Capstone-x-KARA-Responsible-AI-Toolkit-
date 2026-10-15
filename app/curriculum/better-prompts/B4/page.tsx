export default function Home() {
  return (
    <main>
      <p>Unit B4</p>
      <h1>Handing Work To Someone Else With A Complete Prompt</h1>
      <h2>Writing one self-contained prompt another person pastes into a fresh chat and executes without re-explanation.
        Full context, tasks, voice notes, human-confirmation checkpoints, and model + settings named up front.<br /><br /></h2>

      <h3><strong>What goes in a handoff prompt</strong></h3>
      <p>Full context (what came before), the tasks (specific and ordered), voice notes (how the output should sound),
        human-confirmation checkpoints (where the person picks up before Claude proceeds), and the model + settings named up front
        (which Claude model to use, extended thinking on or off, etc.).<br /><br /></p>

      <h3><strong>Underspecified vs. complete</strong></h3>
      <p>Underspecified: 'Have Claude help you draft the report.' Complete: 'Paste this into a fresh Claude Opus chat with extended thinking on.
        Read the attached brief. Draft Sections 1 and 2. Stop and show me before Section 3. Voice: keep it clinical, no marketing language.'
        The second one runs without a follow-up email.<br /><br /></p>
    </main>
  );
}