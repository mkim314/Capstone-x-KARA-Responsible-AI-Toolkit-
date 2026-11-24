// "Test Your Knowledge" questions shown at the end of each unit on the
// Curriculum page, and the scores saved for the progress page (/progress).
// Questions are drafts written only from the unit text in curriculum.js;
// Adam reviews each correct answer before release.
//
// Each question: `correct` is the right answer, `others` are the wrong ones
// (shown in a fixed shuffled order), `section` must match a section heading in
// curriculum.js so the review link can jump to it, and `explanation` is shown
// after the visitor answers.

export const knowledgeChecks = {
  B7: [
    {
      id: "b7-appeals",
      question: "A department chair wants Claude to decide which student appeals to approve. What does the unit advise?",
      correct: "Use AI to organize and draft, and leave the decision to a person",
      others: [
        "Let Claude decide, since it is consistent",
        "Approve whatever Claude ranks highest",
        "Use Claude only if the appeals are short",
      ],
      section: "When to use AI, when to route to a human",
      explanation: "AI helps with access, drafting and structure. Decisions that affect people's lives go to a person.",
    },
    {
      id: "b7-figures",
      question: "Claude drafts a report with figures you cannot check yourself. What should happen next?",
      correct: "Hold it until someone who knows the material confirms the numbers, dates and sources",
      others: [
        "Send it with a note that AI helped write it",
        "Ask Claude to double-check its own figures",
        "Send it if the figures look reasonable",
      ],
      section: "Verified content only",
      explanation: "If you can't tell whether the output is correct, it isn't ready to ship. Confirm numbers, dates and sources first. Saying where AI was used matters too, but it doesn't make the figures correct.",
    },
    {
      id: "b7-names",
      question: "You want help summarizing meeting notes that name employees. What is the lower-risk option?",
      correct: "Replace names with bracket notation such as [employee’s name] before pasting",
      others: [
        "Paste the notes as they are",
        "Paste only the first page",
        "Ask Claude to forget the names afterward",
      ],
      section: "Care with sensitive or vulnerable contexts",
      explanation: "Removing identifying details lets you still use the model while lowering the risk to people's privacy.",
    },
  ],
  B2: [
    {
      id: "b2-heavy-lifting",
      question: "In a quick interactive app, what does the heavy lifting?",
      correct: "The knowledge base you already maintain",
      others: ["The app’s design", "The model you pick", "The questions people type"],
      section: "The frame",
      explanation: "The app is only the surface. The information you already keep up to date is what makes it useful.",
    },
    {
      id: "b2-time",
      question: "What time budget does the unit give for the syllabus bot?",
      correct: "About 30 minutes",
      others: ["Five minutes", "A full afternoon", "About a week"],
      section: "Faculty worked example: syllabus bot",
      explanation: "The syllabus bot is meant to take about 30 minutes and ship as a link on your course page.",
    },
  ],
  B3: [
    {
      id: "b3-decisions",
      question: "Each row of a “what did we decide” note lists the decision, its owner, confidence and what else?",
      correct: "The exact quote that grounds the decision",
      others: ["The meeting length", "Everyone who attended", "A summary of the meeting"],
      section: "(b) 'What did we decide' across transcripts",
      explanation: "The exact quote shows where each decision came from, which helps when a topic came up in several meetings.",
    },
    {
      id: "b3-assignments",
      question: "What is the fastest way to send task assignments after a meeting?",
      correct: "Upload the transcript and ask for an assignment email in your voice, sent within the hour",
      others: [
        "Write notes from memory the next day",
        "Forward the recording to everyone",
        "Ask each person to list their own tasks",
      ],
      section: "(a) Assignment emails from a transcript",
      explanation: "Claude can turn the transcript into an email with a section for each person, so it goes out within the hour.",
    },
    {
      id: "b3-walkthrough",
      question: "What does the unit suggest instead of typing up a build spec?",
      correct: "Record a walkthrough and have Claude build from its transcript",
      others: ["Draw a diagram and paste it", "Send a one-line request", "Hold a status meeting first"],
      section: "(c) Recorded walkthrough as the build spec",
      explanation: "A recorded walkthrough is faster and keeps details you would lose in a written spec.",
    },
  ],
  B6: [
    {
      id: "b6-samples",
      question: "How many writing samples should you gather to teach Claude your tone?",
      correct: "Three to five pieces you know sound like you",
      others: ["One recent email", "Twenty or more", "None; a description of your style is enough"],
      section: "What to gather",
      explanation: "Three to five pieces you know are yours, such as a strong email or a report, give Claude enough to match.",
    },
    {
      id: "b6-why",
      question: "Why use real writing samples instead of describing your voice?",
      correct: "Claude matches examples better than it follows a description",
      others: [
        "Descriptions are not allowed in settings",
        "Samples are shorter to write",
        "Descriptions make Claude more formal",
      ],
      section: "The rationale",
      explanation: "A description tells Claude about your voice. Samples show it, and Claude is better at matching what it sees.",
    },
  ],
  B1: [
    {
      id: "b1-gate",
      question: "You are asking Claude for a report you will submit. When should it ask its clarifying questions?",
      correct: "All at once, in one message, before writing anything",
      others: ["One at a time while drafting", "After the first draft", "Never; it should just state assumptions"],
      section: "The clarification gate (for real deliverables)",
      explanation: "For work you will send, all questions come first in one message, so you make the decisions before a draft exists.",
    },
    {
      id: "b1-quick",
      question: "For a five-minute, one-off task, how many clarifying questions should Claude ask?",
      correct: "At most one, then state assumptions and keep going",
      others: ["A full set up front", "None, ever", "At least three"],
      section: "Quick mode (for quick tasks)",
      explanation: "The full set of questions is worth it for real deliverables, not for a quick task.",
    },
    {
      id: "b1-lazy",
      question: "Claude asks you something a quick search would answer. What should you do?",
      correct: "Correct it; it should research what it can before asking",
      others: ["Answer it every time", "Start a new chat", "Switch to a bigger model"],
      section: "No lazy confirmations",
      explanation: "Claude should look up what it can find on its own and save its questions for decisions only you can make.",
    },
  ],
  B4: [
    {
      id: "b4-not-included",
      question: "Which of these is NOT part of a complete handoff prompt?",
      correct: "Your account login details",
      others: [
        "Full context of what came before",
        "Human-confirmation checkpoints",
        "The model and settings named up front",
      ],
      section: "What goes in a handoff prompt",
      explanation: "A handoff prompt has context, ordered tasks, voice notes, checkpoints and the model and settings. Login details never go in a prompt.",
    },
    {
      id: "b4-complete",
      question: "Which handoff would run without a follow-up email?",
      correct: "Paste this into a fresh Claude Opus chat with effort set to high, read the brief, draft Sections 1 and 2, stop before Section 3, keep the voice clinical",
      others: [
        "Have Claude help you draft the report",
        "Finish the report like we discussed",
        "Use AI to write the report",
      ],
      section: "Underspecified vs. complete",
      explanation: "It names the model, the setting, the tasks, where to stop and the voice, so the next person doesn't need to ask anything.",
    },
  ],
  B5: [
    {
      id: "b5-testable",
      question: "Which is a testable completion criterion?",
      correct: "Done when the XLSX lists all 27 modules",
      others: [
        "Done when the spreadsheet is complete",
        "Done when it looks professional",
        "Done when you are happy with it",
      ],
      section: "The rule",
      explanation: "You can check “all 27 modules” with a yes or no. “Complete” and “professional” can't be checked.",
    },
    {
      id: "b5-where",
      question: "Where should the “done” criterion go?",
      correct: "One sentence at the end of the prompt",
      others: [
        "In the chat’s title",
        "In a follow-up message after the output",
        "Nowhere; Claude can infer it",
      ],
      section: "Where to put it",
      explanation: "One sentence at the end of the prompt, written so you could check it without opening the deliverable.",
    },
  ],
  B8: [
    {
      id: "b8-start",
      question: "Which model does the unit suggest starting with for most tasks?",
      correct: "Sonnet 5.5",
      others: ["Haiku 5.5", "Opus 5.5", "Fable 5.2"],
      section: "What to pick",
      explanation: "Start with Sonnet and move up only if it struggles.",
    },
    {
      id: "b8-confused",
      question: "Sonnet keeps getting confused on a large, multi-file codebase. What next?",
      correct: "Switch to Opus 5.5",
      others: ["Switch to Haiku 5.5 for speed", "Lower the effort setting", "Repeat the same prompt"],
      section: "Opus 5.5",
      explanation: "When Sonnet gets confused on complex work, such as a large codebase, the unit recommends Opus.",
    },
    {
      id: "b8-effort",
      question: "Your prompt is vague and the answer is poor. Will setting effort to Max fix it?",
      correct: "No; a higher effort setting will not fix a vague prompt",
      others: ["Yes, always", "Only with Fable 5.2", "Only on Haiku 5.5"],
      section: "What to pick",
      explanation: "More effort means more thinking, but it can't make up for a vague prompt. Make the request clearer first.",
    },
  ],
  B9: [
    {
      id: "b9-assumptions",
      question: "A handout Claude drafted for families assumes everyone has a car and reliable internet. What should you ask Claude first?",
      correct: "Who exactly the imagined reader is, and every assumption the draft makes about their time, money, transportation, internet and language",
      others: ["To make the handout shorter", "To use a more formal tone", "To add a disclaimer at the end"],
      section: "Leaning on stereotypes",
      explanation: "Asking who the imagined reader is brings the assumptions into the open, so you can rewrite the handout for the people you are actually reaching.",
    },
    {
      id: "b9-audience",
      question: "How do you keep Claude from writing for a general audience?",
      correct: "Say exactly who the audience is in the prompt",
      others: ["Use the largest model", "Ask for simpler words", "Give more formatting examples"],
      section: "Assuming general audience",
      explanation: "Claude writes for whoever you describe. Naming the audience keeps the output on target.",
    },
  ],
};

// A stable shuffle so the correct answer isn't always first, and the order
// doesn't change between visits.
function hash(text) {
  let value = 0;
  for (const character of text) value = (value * 31 + character.charCodeAt(0)) >>> 0;
  return value;
}

export function choicesFor(question) {
  const choices = [question.correct, ...question.others];
  let seed = hash(question.id);
  for (let index = choices.length - 1; index > 0; index -= 1) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const swap = seed % (index + 1);
    [choices[index], choices[swap]] = [choices[swap], choices[index]];
  }
  return choices;
}

// The id used for a section's anchor on the unit page.
export function sectionId(unitSlug, heading) {
  return `${unitSlug}-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

// Scores are saved in this browser only: { [unitSlug]: { first, best, total } }.
const SCORES_KEY = "rat-knowledge-check-scores";

export function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(SCORES_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

// Removes every saved score in this browser (the progress page's
// "Clear my scores").
export function clearScores() {
  try {
    localStorage.removeItem(SCORES_KEY);
  } catch {
    // Storage can be blocked; nothing was saved in that case.
  }
}

// Saves a finished attempt and returns the unit's updated record.
export function saveScore(unitSlug, correct, total) {
  const scores = loadScores();
  const previous = scores[unitSlug];
  const record = {
    first: previous ? previous.first : correct,
    best: previous ? Math.max(previous.best, correct) : correct,
    total,
  };
  scores[unitSlug] = record;
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch {
    // Storage can be blocked; the score still shows for this attempt.
  }
  return record;
}

export function statusFor(record) {
  if (!record) return "not-started";
  return record.best >= record.total ? "complete" : "review";
}
