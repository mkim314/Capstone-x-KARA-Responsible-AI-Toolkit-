export default function Home() {
  return (
    <main>
      <p>Unit B3</p>
      <h1>Meetings And Transcripts</h1>
      <h2>One process family, four parts. Assignment emails in your voice, decisions notes across transcripts, transcript-as-spec builds,
        and the shared working-session format.<br /><br /></h2>

      <h3><strong>(a) Assignment emails from a transcript</strong></h3>
      <p>Upload the meeting transcript. Ask for an assignment email in your voice, with person-named task headers and links or notes under each task.
        Send it within the hour instead of the next day.<br /><br /></p>

      <h3><strong>(b) 'What did we decide' across transcripts</strong></h3>
      <p>Ask Claude to produce a structured decisions note across one or more transcripts. Each row: what was decided, who owns it, confidence,
        and the exact quote that grounds the decision. This catches drift when the same topic came up across three meetings and
        no one is sure what the current state is.<br /><br /></p>

      <h3><strong>(c) Recorded walkthrough as the build spec</strong></h3>
      <p>Record a walkthrough of what you want built. Paste the transcript into a chat. Have Claude build from it instead of retyping requirements in text.
        Faster and captures nuance you would lose in a written spec.<br /><br /></p>

      <h3><strong>(d) The shared working-session format</strong></h3>
      <p>Two people, one shared Claude chat, drop the brief and the transcripts in, leave with decisions locked.
        Jarred's rule, verbatim: 'Not a status meeting.'<br /><br /></p>
    </main>
  );
}