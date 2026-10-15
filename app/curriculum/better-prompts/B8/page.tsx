export default function Home() {
  return (
    <main>
      <p>Unit B8 (new)</p>
      <h1>Picking the right model / settings</h1>
      <h2>Claude has a variety of different models. It is important to select the right one for each task.<br /><br /></h2>

      <h3><strong>Haiku 5.5</strong></h3>
      <p>This model is best used for simple tasks, such as looking up information, reads or writes, formatting, and quick chat replies. 
        Can be used as a first pass for different tasks, and then if the output is determined to be not up to standard, Sonnet can be used instead.
        Haiku is typically used as the cheapest per finished task, but this may not be true if the model is struggling to find an answer.<br /><br /></p>

      <h3><strong>Sonnet 5.5</strong></h3>
      <p>This model is recommended as a starting point for most tasks. It can help with research, writing and editing.
        It is also very useful in assisting coding/programming tasks.<br /><br /></p>

      <h3><strong>Opus 5.5</strong></h3>
      <p>Used for even more complex tasks. Whenever you're working with Sonnet and it gets confused, it is recommended to switch to Opus.
         It is used for more complex analysis, such as solving a problem in a large, multi-file codebase.<br /><br /></p>

      <h3><strong>Effort</strong></h3>
      <p>Each of the Claude models allows you to pick an "effort" value, those being Low, Medium, High, Extra, and Max.
        These affect how much thinking the model does, with lower effort producing a faster, cheaper response
        while a higher effort produces a more thorough response.<br /><br /></p>
    </main>
  );
}