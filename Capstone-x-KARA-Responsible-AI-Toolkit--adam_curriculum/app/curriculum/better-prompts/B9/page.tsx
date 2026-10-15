export default function Home() {
  return (
    <main>
      <p>Unit B9 (new)</p>
      <h1>Spotting Bias / Missing Voice</h1>
      <h2>Output of Claude should be fine tuned to avoid stereotypes or a general audience that does not apply to the context of KARA.<br /><br /></h2>

      <h3><strong>Leaning on stereotypes</strong></h3>
      <p>Claude, being an LLM, may be influenced by stereotypes of different groups. Pay attention and try and notice if this comes up in any of its outputs.<br /><br /></p>

      <h3><strong>Assuming general audience</strong></h3>
      <p>Preferably Claude should not assume the context of a task only applies to a general audience.
        It is important to make sure that Claude is aware that the output should apply to KARA's mission of child welfare.<br /><br /></p>

      <h3><strong>Resource Guide Example</strong></h3>
      <p>Not every family is going to have access to reliable internet, a car, or maybe even a place to live. 
        A resource guide that assumes a family has access to these would be less useful.<br /><br /></p>
    </main>
  );
}