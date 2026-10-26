
export const curriculum = [
  {
    title: "Start Here",
    slug: "start-here",
    topics: [
      {
        unit: "B7 (revised)",
        title: "Responsible Use Basics",
        slug: "B7",
        description:
          "One screen, three points. When to use AI vs. route to a human, verified-content-only philosophy, care with sensitive or vulnerable contexts.",
        sections: [
          {
            heading: "When to use AI, when to route to a human",
            body: "Use AI for access, drafting, and structure. Route to a human for judgment, verification, and decisions that affect people's lives. The 'AI for Access, Not Creation' philosophy from the Marketing MRG (03/13/2026) is the anchor.",
          },
          {
            heading: "Verified content only",
            body: "Never ship AI-generated content without human review. Mark AI-drafted vs. human-confirmed visibly so the trace does not get lost when the document passes through multiple hands. (Edit): When verifying AI-generated content, the human should have an understanding of the material enough to be able to spot any mistakes with the output. Confirm numbers, dates, and sources are valid.",
          },
          {
            heading: "Disclose use of AI (new)",
            body: "Document where AI was used, whether it be in emails, coursework, or published materials.",
          },
          {
            heading: "Care with sensitive or vulnerable contexts",
            body: "Student data, mental health, legal contexts, and other high-stakes situations need extra caution. When in doubt, do not send the content to the model at all.",
          },
           {
            heading: "Strip identifying details (new)",
            body: "Instead of pasting sensitive information, strip the identifying details so the model can still be used without violating privacy. An example is changing student names to Student A, B, etc.",
          },
        ],
      },
    ],
  },
  {
    title: "Using my own work",
    slug: "using-my-own-work",
    topics: [
      {
        unit: "B2",
        title: "Turn Your Own Documents Into A Quick Interactive App",
        slug: "B2",
        description:
          "The thirty-minute pattern. A knowledge base you already maintain becomes a small interactive app you can send anyone, instead of a twenty-page document.",
        sections: [
          {
            heading: "The frame",
            body: "Jarred's verbiage, verbatim: 'The knowledge base does the heavy lifting. The interactive app on top of it is just the surface. Easier on the reader, faster for the team.'",
          },
          {
            heading: "Faculty worked example: syllabus bot",
            body: "Take your syllabus (a document you already maintain). Ask Claude to build a small Q-and-A interface where students can type questions like 'when is the midterm' or 'what percentage of the grade is participation' and get answers pulled from the syllabus. Time budget: 30 minutes. Ships as a link you can put in your course page.",
          },
          {
            heading: "The intro line to reuse",
            body: "When you share the finished app, say: 'This app took about thirty minutes to build, using information we already had.' That framing lowers the barrier for the next person to try it.",
          },
        ],
      },
      {
        unit: "B3",
        title: "Meetings And Transcripts",
        slug: "B3",
        description:
          "One process family, four parts. Assignment emails in your voice, decisions notes across transcripts, transcript-as-spec builds, and the shared working-session format.",
        sections: [
          {
            heading: "(a) Assignment emails from a transcript",
            body: "Upload the meeting transcript. Ask for an assignment email in your voice, with person-named task headers and links or notes under each task. Send it within the hour instead of the next day.",
          },
          {
            heading: "(b) 'What did we decide' across transcripts",
            body: "Ask Claude to produce a structured decisions note across one or more transcripts. Each row: what was decided, who owns it, confidence, and the exact quote that grounds the decision. This catches drift when the same topic came up across three meetings and no one is sure what the current state is.",
          },
          {
            heading: "(c) Recorded walkthrough as the build spec",
            body: "Record a walkthrough of what you want built. Paste the transcript into a chat. Have Claude build from it instead of retyping requirements in text. Faster and captures nuance you would lose in a written spec.",
          },
          {
            heading: "(d) The shared working-session format",
            body: "Two people, one shared Claude chat, drop the brief and the transcripts in, leave with decisions locked. Jarred's rule, verbatim: 'Not a status meeting.'",
          },
        ],
      },
      {
        unit: "B6",
        title: "Teach Claude Your Own Tone With Your Own Writing",
        slug: "B6",
        description:
          "Use writing you have already invested effort in - emails you spent time on, written work you submitted - as tone-training examples for your Claude account so outputs sound like you.",
        sections: [
          {
            heading: "What to gather",
            body: "Three to five pieces of writing you know are 'you.' A well-written email you sent. An application essay you submitted. A talk you gave. A report you wrote.",
          },
          {
            heading: "How to load them",
            body: "Paste them into a project knowledge folder. Or attach them to a chat where you say: 'Here are 3-5 examples of my own writing. When you draft anything as me, match this voice. Do not average across all AI voices.'",
          },
          {
            heading: "The rationale",
            body: "A preferences profile describes your voice. Actual writing samples show your voice. Claude is better at pattern-matching than following a voice description. Samples close the gap.",
          },
        ],
      },
    ],
  },
  {
    title: "Better Prompts",
    slug: "better-prompts",
    topics: [
      {
        unit: "B1",
        title: "Getting Claude To Ask Questions At The Right Time",
        slug: "B1",
        description:
          "One process with three parts. For real deliverables, require all clarifying questions up front. For quick tasks, one question maximum. No lazy confirmations.",
        sections: [
          {
            heading: "The clarification gate (for real deliverables)",
            body: "For anything you will actually send or ship, require Claude to ask all clarifying questions in one consolidated message BEFORE generating anything. Jarred's rule, verbatim: 'This is non-negotiable - I will correct you if you skip the clarification gate.' The consolidated ask forces Claude to think about what it needs, and it forces you to make the decisions instead of accepting a plausible-sounding first draft.",
          },
          {
            heading: "Quick mode (for quick tasks)",
            body: "For fast one-off asks: one clarifying question maximum. State your assumptions. Keep moving. The clarification gate is expensive; do not apply it to a five-minute task.",
          },
          {
            heading: "No lazy confirmations",
            body: "Claude should research what it can answer for itself before asking. If it is asking you a question a search would answer, correct it.",
          },
        ],
      },
      {
        unit: "B4",
        title: "Handing Work To Someone Else With A Complete Prompt",
        slug: "B4",
        description:
          "Writing one self-contained prompt another person pastes into a fresh chat and executes without re-explanation. Full context, tasks, voice notes, human-confirmation checkpoints, and model + settings named up front.",
        sections: [
          {
            heading: "What goes in a handoff prompt",
            body: "Full context (what came before), the tasks (specific and ordered), voice notes (how the output should sound), human-confirmation checkpoints (where the person picks up before Claude proceeds), and the model + settings named up front (which Claude model to use, extended thinking on or off, etc.).",
          },
          {
            heading: "Underspecified vs. complete",
            body: "Underspecified: 'Have Claude help you draft the report.' Complete: 'Paste this into a fresh Claude Opus chat with extended thinking on. Read the attached brief. Draft Sections 1 and 2. Stop and show me before Section 3. Voice: keep it clinical, no marketing language.' The second one runs without a follow-up email.",
          },
        ],
      },
      {
        unit: "B5",
        title: "Say What Done Looks Like",
        slug: "B5",
        description:
          "State a testable completion criterion inside the request so 'done' is checkable.",
        sections: [
          {
            heading: "The rule",
            body: "'Done when the XLSX has all 27 modules listed' is a testable criterion. 'Done when the spreadsheet is complete' is not.",
          },
          {
            heading: "Where to put it",
            body: "End of the prompt. One sentence. Something you could actually check without opening the deliverable.",
          },
        ],
      },
      {
        unit: "B8 (new)",
        title: "Picking the right model / settings",
        slug: "B8",
        description:
          "Claude has a variety of different models. It is important to select the right one for each task.",
        sections: [
          {
            heading: "Haiku 5.5",
            body: "This model is best used for simple tasks, such as looking up information, reads or writes, formatting, and quick chat replies. Can be used as a first pass for different tasks, and then if the output is determined to be not up to standard, Sonnet can be used instead. Haiku is typically used as the cheapest per finished task, but this may not be true if the model is struggling to find an answer.",
          },
          {
            heading: "Sonnet 5.5",
            body: "This model is recommended as a starting point for most tasks. It can help with research, writing and editing. It is also very useful in assisting coding/programming tasks.",
          },
          {
            heading: "Opus 5.5",
            body: "Used for even more complex tasks. Whenever you’re working with Sonnet and it gets confused, it is recommended to switch to Opus. It is used for more complex analysis, such as solving a problem in a large, multi-file codebase.",
          },
          {
            heading: "Effort",
            body: "Each of the Claude models allows you to pick an “effort” value, those being Low, Medium, High, Extra, and Max. These affect how much thinking the model does, with lower effort producing a faster, cheaper response while a higher effort produces a more thorough response.",
          },
        ],
      },
      {
        unit: "B9 (new)",
        title: "Spotting Bias / Missing Voice",
        slug: "B9",
        description:
          "Output of Claude should be fine tuned to avoid stereotypes or a general audience that does not apply to the context of KARA.",
         sections: [
          {
            heading: "Leaning on stereotypes",
            body: "Claude, being an LLM, may be influenced by stereotypes of different groups. Pay attention and try and notice if this comes up in any of its outputs.",
          },
          {
            heading: "Assuming general audience",
            body: "Preferably Claude should not assume the context of a task only applies to a general audience. It is important to make sure that Claude is aware that the output should apply to KARA’s mission of child welfare.",
          },
          {
            heading: "Resource Guide Example",
            body: "Not every family is going to have access to reliable internet, a car, or maybe even a place to live. A resource guide that assumes a family has access to these would be less useful.",
          },
        ],
      },
    ],
  },
];
