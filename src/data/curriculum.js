
// `tags` connect units to quiz answers (see src/data/quiz.js and the Intro
// Quiz Specs doc, section 4). A unit can have several tags.
export const curriculum = [
  {
    title: "Start Here",
    slug: "start-here",
    topics: [
      {
        unit: "B7",
        title: "Responsible Use Basics",
        slug: "B7",
        tags: [],  // Everyone gets this unit, so the quiz doesn't score it.
        description:
          "One screen, three points. When to use AI vs. route to a human, verified-content-only philosophy, care with sensitive or vulnerable contexts.",
        sections: [
          {
            heading: "When to use AI, when to route to a human",
            body: "Use AI for access, drafting, and structure. Route to a human for judgment, verification, and decisions that affect people's lives.",
          },
          {
            heading: "Verified content only",
            body: "Never ship AI-generated content without human review. Mark AI-drafted vs. human-confirmed visibly so the trace does not get lost when the document passes through multiple hands. When verifying AI generated content, you should know the material enough to where you can tell whether the output has a mistake in it. If you aren’t able to tell if the output is correct, it’s not ready to ship. Confirm numbers, dates, and sources are valid. Also, it is important to disclose where AI was used, whether it be in emails, coursework, or published materials. Any sort of data or figures should have a traceable federal/state level source, or come from a credible online source, such as a database or research organization.",
          },
          {
            heading: "Care with sensitive or vulnerable contexts",
            body: "Student data, mental health, legal contexts, and other high-stakes situations need extra caution. When in doubt, do not send the content to the model at all. For lower risk material, instead of pasting sensitive information, strip the identifying details so the model can still be used without reducing the risk of a breach of privacy. An example is changing employee names or meeting transcript to bracket notation such as [employee’s name], [meeting transcript].",
          },
        ],
        walkthrough: {
          scenario:
            "You want help summarizing meeting notes and drafting a short update that includes a few figures. You will decide what Claude should touch, what stays with a person, and how to label the result.",
          steps: [
            {
              title: "Decide what goes to AI and what goes to a person",
              body: "Use AI for access, drafting, and structure. Keep judgment, verification, and decisions that affect people's lives with a human. Summarizing notes is drafting. Deciding what the notes mean for a person is not.",
            },
            {
              title: "Check whether the material should go in at all",
              body: "Student data, mental health, legal contexts, and other high-stakes situations need extra caution. When in doubt, do not send the content to the model. If the notes are in one of those categories, stop here and do the work yourself.",
            },
            {
              title: "Strip identifying details",
              body: "For lower-risk material, replace identifying details with bracket notation before you paste. Claude can still do the task, and the risk of a privacy breach drops.",
              prompt:
                "Summarize the action items from the notes below. Names have been replaced with bracket notation, so keep it that way.\n\n[employee's name] will send the budget draft to [employee's name] by [date]. [employee's name] asked whether the [meeting transcript] needs to be shared with the full team.",
            },
            {
              title: "Make Claude show its sources",
              body: "Any data or figures should have a traceable federal or state source, or come from a credible source such as a database or research organization. Ask Claude to flag anything it cannot source instead of filling it in.",
              prompt:
                "For every figure in this draft, list the source it came from. If I did not give you a source, write 'source not provided' instead of supplying one.",
            },
            {
              title: "Verify before you ship",
              body: "Confirm numbers, dates, and sources yourself. You should know the material well enough to tell whether the output has a mistake. If you cannot tell whether it is correct, it is not ready to ship.",
            },
            {
              title: "Label it and disclose it",
              body: "Mark which parts are AI-drafted and which are human-confirmed, so the trace does not get lost as the document passes through hands. Disclose where AI was used, whether in an email, coursework, or published material.",
              prompt:
                "AI-drafted, human-confirmed by [reviewer's name] on [date].",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Using My Own Work",
    slug: "using-my-own-work",
    topics: [
      {
        unit: "B2",
        title: "Turn Your Documents into a Quick App",
        slug: "B2",
        tags: ["sharing-info", "teaching"],
        description:
          "The thirty-minute pattern. A knowledge base you already maintain becomes a small interactive app you can send anyone, instead of a twenty-page document.",
        sections: [
          {
            heading: "The frame",
            body: "The idea behind this is that having a preexisting knowledge base will do all the heavy lifting for you. By creating an interactive app on top of it, the app is simply a way of making it easier on the reader to find what they need from your knowledge base.",
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
        walkthrough: {
          scenario:
            "You maintain a syllabus and students keep emailing the same questions. You will turn it into a small Q-and-A app in about 30 minutes.",
          steps: [
            {
              title: "Pick the document you already maintain",
              body: "The knowledge base does the heavy lifting, so start with a document that is already accurate and current. Here, that is your syllabus. Do not rewrite it first. Have the file ready to attach.",
            },
            {
              title: "Ask Claude to build the app",
              body: "Attach the syllabus and ask for a small Q-and-A interface that answers only from that document. Setting a time budget keeps the first version small.",
              prompt:
                "Attached is my course syllabus. Build a small interactive Q-and-A app where students type a question and get an answer pulled only from the syllabus. If the syllabus does not contain the answer, the app should say so instead of guessing. Time budget: 30 minutes. It should publish as a link I can put in my course page.",
            },
            {
              title: "Test it with real student questions",
              body: "Before you share anything, try the kinds of questions students actually ask. Check each answer against the syllabus yourself.",
              prompt:
                "when is the midterm\nwhat percentage of the grade is participation",
            },
            {
              title: "Publish the link",
              body: "Once the answers match the syllabus, publish the app and put the link in your course page. The syllabus stays the source of truth. If it changes, update the document and rebuild.",
            },
            {
              title: "Share it with the intro line",
              body: "When you send the link, use the framing from this unit. It lowers the barrier for the next person to try it.",
              prompt:
                "This app took about thirty minutes to build, using information we already had.",
            },
          ],
        },
      },
      {
        unit: "B3",
        title: "Meetings and Transcripts",
        slug: "B3",
        tags: ["meetings"],
        description:
          "One process family, four parts. Create assignment emails in your voice, decisions notes across transcripts, transcript-as-spec builds, and the shared working-session format.",
        sections: [
          {
            heading: "(a) Assignment emails from a transcript",
            body: "Upload the meeting transcript. Ask Claude for an assignment email in your voice, with person-named task headers and links or notes under each task. Send it within the hour instead of the next day.",
          },
          {
            heading: "(b) 'What did we decide' across transcripts",
            body: "Ask Claude to produce a structured decisions note across one or more transcripts. Each row: what was decided, who owns it, confidence, and the exact quote that grounds the decision. This catches drift when the same topic comes up across three meetings and no one is sure what the current state is.",
          },
          {
            heading: "(c) Recorded walkthrough as the build spec",
            body: "Record a walkthrough of what you want built. Paste the transcript into a chat. Have Claude build from it instead of retyping requirements in text. This method is faster and captures nuance you would lose in a written spec.",
          },
          {
            heading: "(d) The shared working-session format",
            body: "Two people, one shared Claude chat, drop the brief and the transcripts in, leave with decisions locked.",
          },
        ],
        walkthrough: {
          scenario:
            "Your team just finished a planning meeting and you have the transcript. You will turn it into assignment emails, a decisions note, and a build spec, then set up a shared working session.",
          steps: [
            {
              title: "Prepare the transcript",
              body: "Before you paste a transcript into Claude, apply the care from Responsible Use Basics. Change participant names to bracket notation such as [employee's name] if the content is sensitive, and leave out anything that should not go to the model at all.",
            },
            {
              title: "(a) Draft the assignment email",
              body: "Upload the transcript and ask for the email in your voice, with a header for each person and links or notes under each task. The goal is to send it within the hour instead of the next day. Read it against the transcript before you send it.",
              prompt:
                "Attached is the transcript from today's planning meeting. Write an assignment email in my voice. Give each person their own header, and list their tasks under it with any links or notes that came up. Before you write the email, ask me every clarifying question you need in one message.",
            },
            {
              title: "(b) Build a decisions note",
              body: "Ask for a structured note across one or more transcripts. Each row needs what was decided, who owns it, confidence, and the exact quote that grounds it. The quote column lets you catch drift when a topic comes up in three meetings and nobody is sure of the current state.",
              prompt:
                "Using the attached transcripts, produce a decisions table. Columns: what was decided, who owns it, confidence (high, medium, low), and the exact quote that supports the decision. If a topic was discussed but not decided, mark it as undecided instead of picking an answer.",
            },
            {
              title: "(c) Record a walkthrough as the build spec",
              body: "If the meeting was about something to build, record yourself walking through what you want, then paste that transcript into a chat. Claude builds from it instead of from requirements you retype. This keeps nuance a written spec would lose.",
              prompt:
                "The transcript below is me walking through what I want built. Treat it as the spec. Before you build anything, list every requirement you heard and every question you still have, in one message.",
            },
            {
              title: "(d) Run a shared working session",
              body: "Two people open one shared Claude chat, drop in the brief and the transcripts, and work through it together. Finish by asking Claude to list the decisions so both people leave with the same record.",
              prompt:
                "We are two people working in this chat. Using the brief and transcripts above, list every decision we made in this session and every open item, with an owner for each.",
            },
          ],
        },
      },
      {
        unit: "B6",
        title: "Teach Claude Your Own Tone",
        slug: "B6",
        tags: ["writing"],
        description:
          "Use writing you have already invested effort in - emails you spent time on, written work you submitted - as tone-training examples for your Claude account so outputs sound like you.",
        sections: [
          {
            heading: "What to gather",
            body: "Gather three to five pieces of writing you know are 'you.' A well-written email you sent. An application essay you submitted. A talk you gave. A report you wrote. Use these as tone-training examples for Claude.",
          },
          {
            heading: "How to load them",
            body: "Paste your training examples into a project knowledge folder. Or attach them to a chat where you say: 'Here are 3-5 examples of my own writing. When you draft anything as me, match this voice. Do not average across all AI voices.'",
          },
          {
            heading: "The rationale",
            body: "A preferences profile describes your voice. Actual writing samples show your voice. Claude is better at pattern-matching than following a voice description. Samples close the gap.",
          },
        ],
        walkthrough: {
          scenario:
            "Claude's drafts of your emails sound generic. You will load real samples of your writing so its drafts sound like you.",
          steps: [
            {
              title: "Gather three to five samples",
              body: "Pick writing you know is you and that you put effort into: a well-written email you sent, an application essay you submitted, a talk you gave, or a report you wrote. If a sample names other people, replace those names with bracket notation such as [family member] or [employee's name] before you load it.",
            },
            {
              title: "Load them",
              body: "Paste the samples into a project knowledge folder, or attach them to a chat and say this.",
              prompt:
                "Here are 3-5 examples of my own writing. When you draft anything as me, match this voice. Do not average across all AI voices.",
            },
            {
              title: "Ask for a real draft",
              body: "Give Claude a task you would normally write yourself, such as a reply you need to send this week.",
              prompt:
                "Draft a reply to the email below in my voice. Keep it to one short paragraph.",
            },
            {
              title: "Compare against your own writing",
              body: "Read the draft next to one of your samples. Check sentence length, how you open and close, and the words you would never use. Name the specific differences you find to Claude instead of saying it does not sound right.",
              prompt:
                "This draft opens with a greeting I never use and is more formal than my samples. Rewrite it matching how my samples open and close.",
            },
            {
              title: "Add samples where it still misses",
              body: "A description of your voice is weaker than examples of it, because Claude is better at pattern-matching than at following a description. If the draft still misses, add another sample that shows the missing quality.",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Better Prompts",
    slug: "better-prompts",
    topics: [
      {
        unit: "B1",
        title: "Get Claude to Ask Questions at the Right Time",
        slug: "B1",
        tags: ["prompting", "accuracy"],
        description:
          "One process with three parts. For real deliverables, require all clarifying questions up front. For quick tasks, one question maximum. No lazy confirmations.",
        sections: [
          {
            heading: "The clarification gate (for real deliverables)",
            body: "For anything you will actually send or ship, require Claude to ask all clarifying questions in one consolidated message BEFORE generating anything. As a rule of thumb, this idea should be non-negotiable when generating anything with Claude. The consolidated message forces Claude to think about what it needs, and it forces you to make the decisions instead of accepting a plausible-sounding first draft.",
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
        walkthrough: {
          scenario:
            "You need two things today: a volunteer thank-you email that will go to the whole list, and a quick subject line for a different message. They get different treatment.",
          steps: [
            {
              title: "Sort the task: deliverable or quick task?",
              body: "The thank-you email will actually be sent, so it is a real deliverable and gets the clarification gate. The subject line is a five-minute task, so it gets quick mode. Decide this before you type the first prompt.",
            },
            {
              title: "Open the clarification gate",
              body: "Tell Claude up front that it must ask everything in one message and must not draft yet.",
              prompt:
                "I need a thank-you email for our volunteers. Before you generate anything, ask me every clarifying question you need in one consolidated message. Do not write a draft until I have answered. This is non-negotiable.",
            },
            {
              title: "Answer the consolidated questions",
              body: "Claude should come back with one list, for example about audience, tone, length, what the email should ask of readers, and who it is signed by. Answer each one yourself. This is where you make the decisions instead of accepting a plausible-sounding first draft. If Claude starts writing before you answer, correct it.",
            },
            {
              title: "Switch to quick mode for the small task",
              body: "For the subject line, do not use the gate. Allow one question at most, ask Claude to state its assumptions, and keep moving.",
              prompt:
                "Give me three subject line options for a short volunteer schedule reminder. One clarifying question maximum. State your assumptions and keep going.",
            },
            {
              title: "Catch a lazy confirmation",
              body: "If Claude asks you something it could look up or read from material you already gave it, such as a date in an attached schedule, do not answer. Send it back.",
              prompt:
                "That is answerable from the schedule I attached. Check it yourself before asking me.",
            },
          ],
        },
      },
      {
        unit: "B4",
        title: "Hand Off Work with a Complete Prompt",
        slug: "B4",
        tags: ["delegation"],
        description:
          "Writing one self-contained prompt another person pastes into a fresh chat and executes without re-explanation. Full context, tasks, voice notes, human-confirmation checkpoints, and model + settings named up front.",
        sections: [
          {
            heading: "What goes in a handoff prompt",
            body: "Full context (what came before), the tasks (specific and ordered), voice notes (how the output should sound), human-confirmation checkpoints (where the person picks up before Claude proceeds), and the model + settings named up front (which Claude model to use, using a higher or lower effort value, etc.).",
          },
          {
            heading: "Underspecified vs. complete",
            body: "Underspecified: 'Have Claude help you draft the report.' Complete: 'Paste this into a fresh Claude Opus chat with effort level set to “high”. Read the attached brief. Draft Sections 1 and 2. Stop and show me before Section 3. Voice: keep it clinical, no marketing language.' The second one runs without a follow-up email.",
          },
        ],
        walkthrough: {
          scenario:
            "You are going on leave and need a teammate to finish a report draft. They will paste your prompt into a fresh chat and should not need to email you with questions.",
          steps: [
            {
              title: "Start from the underspecified version",
              body: "Write the first thing that comes to mind, then see what is missing from it.",
              prompt: "Have Claude help you draft the report.",
            },
            {
              title: "List what a handoff needs",
              body: "Check your draft against five items: full context of what came before, specific and ordered tasks, voice notes, human-confirmation checkpoints, and the model and settings named up front. The first version has none of them.",
            },
            {
              title: "Write the complete prompt",
              body: "Put all five in one self-contained prompt. The checkpoint tells Claude to stop and show the person before going further.",
              prompt:
                "Paste this into a fresh Claude Opus chat with effort level set to \"high\".\n\nContext: This report follows the brief attached below.\n\nTasks: Read the attached brief. Draft Sections 1 and 2. Stop and show me before Section 3.\n\nVoice: Keep it clinical, no marketing language.",
            },
            {
              title: "Test it in a fresh chat",
              body: "Open a new chat and paste only the prompt and the attachment. If Claude has to ask a question the prompt should have answered, add that answer to the prompt. When it runs without a follow-up, hand it off.",
            },
          ],
        },
      },
      {
        unit: "B5",
        title: "Say What Done Looks Like",
        slug: "B5",
        tags: ["done", "accuracy"],
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
        walkthrough: {
          scenario:
            "You are asking Claude to build a spreadsheet that lists every module in a course. You want to know the moment it is actually done.",
          steps: [
            {
              title: "Spot the vague finish line",
              body: "Look at this request. Nothing in it lets you tell whether the result is finished.",
              prompt:
                "Build a spreadsheet of our modules. Done when the spreadsheet is complete.",
            },
            {
              title: "Make the finish line testable",
              body: "A testable criterion is something you could check without opening the deliverable. Replace 'complete' with a count or a list you can verify.",
              prompt:
                "Done when the XLSX has all 27 modules listed.",
            },
            {
              title: "Put it at the end of the prompt",
              body: "Use one sentence, at the end, so it is the last thing Claude reads.",
              prompt:
                "Build an XLSX of our course modules from the attached outline, one module per row. Done when the XLSX has all 27 modules listed.",
            },
            {
              title: "Check it against the criterion",
              body: "When Claude says it is finished, count the rows. If the count is wrong, send it back with the criterion instead of describing the problem from scratch.",
              prompt:
                "The criterion was all 27 modules listed. The file has fewer. Find the missing modules and add them.",
            },
          ],
        },
      },
      {
        unit: "B8",
        title: "Pick the Right Model and Settings",
        slug: "B8",
        tags: ["tool-choice"],
        description:
          "Claude has a variety of different models. It is important to select the right one for each task. (last checked 11/23/26)",
        sections: [
          {
            heading: "Haiku 5.5",
            body: "This model is best used for simple tasks, such as looking up information, simple reads or writes of text, formatting, and quick chat replies. Can be used as a first pass for different tasks, and then if the output is determined to be not up to standard, Sonnet can be used instead. Haiku is typically used as the cheapest per finished task, but this may not be true if the model is struggling to find an answer.",
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
            heading: "Fable 5.2",
            body: "Sits above Opus in terms of complexity. Used for only the most complex of tasks.",
          },
          {
            heading: "Effort",
            body: "Each of the Claude models allows you to pick an “effort” value, those being Low, Medium, High, Extra, and Max. These affect how much thinking the model does, with lower effort producing a faster, cheaper response while a higher effort produces a more thorough response. However, typically the default will work just fine for most tasks.",
          },
          {
            heading: "What to pick",
            body: "Sonnet should most likely be what you start with, potentially moving up in complexity if Claude messes up. It is important to keep in mind, however, that a higher effort model won’t fix a vague/sloppy prompt.",
          },
        ],
        walkthrough: {
          scenario:
            "You have three tasks of very different difficulty today. You will pick a model for each and see when changing the model helps and when it does not.",
          steps: [
            {
              title: "A simple task: start small",
              body: "Reformatting a list is a simple read and write of text, which suits Haiku. Use it as a first pass. If the output is not up to standard, move up to Sonnet.",
              prompt:
                "Reformat the list below into a table with one row per item. Keep the wording exactly as written.",
            },
            {
              title: "A typical task: start with Sonnet",
              body: "Drafting and editing a short piece is the kind of work Sonnet handles well, and it is the recommended starting point for most tasks.",
              prompt:
                "Edit the draft below for clarity and keep my voice. Show the changes you made.",
            },
            {
              title: "Sonnet gets confused: move up to Opus",
              body: "Say you ask Sonnet to find why a problem occurs across a large, multi-file codebase and its answers stop making sense. That is the signal to switch to Opus, which is meant for more complex analysis.",
            },
            {
              title: "Only the hardest work needs Fable",
              body: "Fable sits above Opus and is for only the most complex tasks. Do not start there for ordinary work.",
            },
            {
              title: "Leave effort alone, then fix the prompt",
              body: "Each model offers Low, Medium, High, Extra, and Max effort. Lower is faster and cheaper, higher is more thorough, and the default works for most tasks. A higher setting will not fix a vague or sloppy prompt, so if results are poor, rewrite the prompt first.",
              prompt:
                "Summarize the attached report in five bullets for a volunteer audience. Done when each bullet is one sentence and none uses jargon.",
            },
          ],
        },
      },
      {
        unit: "B9",
        title: "Spot Bias and Missing Voices",
        slug: "B9",
        tags: ["equity", "teaching"],
        description:
          "Check Claude’s output for stereotypes and for an imagined reader who does not match the target audience.",
         sections: [
          {
            heading: "Leaning on stereotypes",
            body: "Claude, having learned from human writing, may be influenced by stereotypes or biases of different groups. Ask yourself (or Claude) who exactly the imagined reader is and if any unrealistic assumptions are being made regarding what resources they have.",
          },
          {
            heading: "Assuming general audience",
            body: "Preferably Claude should not assume the context of a task only applies to a general audience. It is important to make sure that Claude is aware that the output should apply to the context of Seeds of Success’s mission. Outline who exactly the audience is when prompting Claude, and be aware of any missing voices that aren’t being represented.",
          },
        ],
        walkthrough: {
          scenario:
            "Claude drafted a handout inviting families to take part in a program. Before it goes out, you will check who it imagines it is talking to and whose voice is missing.",
          steps: [
            {
              title: "Ask who the imagined reader is",
              body: "Claude learned from human writing and can lean on stereotypes about groups. Ask it directly who the draft is written for and what it assumes that person has.",
              prompt:
                "Who exactly is the imagined reader of this draft? List every assumption it makes about their time, money, transportation, internet access, and language.",
            },
            {
              title: "Test the assumptions",
              body: "Read the list and mark any assumption that does not match the people you are actually writing for. A handout that assumes a car, a reliable internet connection, or free weekday hours leaves people out.",
            },
            {
              title: "Name the real audience",
              body: "Do not let Claude fall back on a general audience. Say who the audience is and that the work serves the mission of Seeds of Success.",
              prompt:
                "Rewrite this handout for [describe the audience]. This is for Seeds of Success, so it must fit that mission and not a general audience. Do not assume resources I have not told you about.",
            },
            {
              title: "Look for missing voices",
              body: "Ask who is not represented in the draft, then decide which of those voices belong in it.",
              prompt:
                "Whose perspective is missing from this draft? List who is absent and what the draft would need to change to include them.",
            },
          ],
        },
      },
    ],
  },
];
