// Questions and scoring for the intake quiz on /quiz.
// Every visitor answers 6 questions. Question 1 (role) decides the wording and
// answers of questions 2, 4 and 5. Each answer adds points to curriculum units
// (by unit slug in curriculum.js); the 3 highest-scoring units are recommended
// after the start unit. Edit roles, questions, answers or points here; no other
// file needs to change.
import { curriculum } from "./curriculum";

// Everyone is shown this unit first.
export const START_UNIT = "B7";

// Used when the visitor skips enough questions that fewer than 3 units score.
export const FALLBACK_UNITS = ["B1", "B5", "B8"];

// Points for a ranked task: rank 1, rank 2, rank 3.
export const RANK_POINTS = [3, 2, 1];
export const MAX_RANKED = 3;

// Question 1. `audience` is used on the results page ("Recommended for ...").
// `taskList` and `privacy` pick the versions of questions 4 and 5.
export const roles = [
  {
    id: "teach",
    label: "I teach courses",
    detail: "Faculty or instructor",
    icon: "book",
    audience: "faculty and instructors",
    taskList: "teaching",
    privacy: "university",
    points: { B2: 1 },
  },
  {
    id: "design",
    label: "I design courses or run training",
    detail: "Instructional design, teaching and learning",
    icon: "layout",
    audience: "instructional designers and teaching and learning staff",
    taskList: "teaching",
    privacy: "university",
    points: { B4: 1, B5: 1 },
  },
  {
    id: "lead",
    label: "I lead a department or program",
    detail: "Chair, director or coordinator",
    icon: "building",
    audience: "department and program leaders",
    taskList: "leading",
    privacy: "university",
    points: { B3: 1, B4: 1 },
  },
  {
    id: "staff",
    label: "I work in a staff role",
    detail: "Advising, administration, student services",
    icon: "briefcase",
    audience: "university staff",
    taskList: "leading",
    privacy: "university",
    points: { B3: 1, B6: 1 },
  },
  {
    id: "student",
    label: "I’m a student",
    detail: "Undergraduate or graduate",
    icon: "cap",
    audience: "students",
    taskList: "student",
    privacy: "student",
    points: { B1: 1, B8: 1 },
  },
  {
    id: "nonprofit",
    label: "I work with a nonprofit",
    detail: "Staff or volunteer in the community",
    icon: "heart",
    audience: "nonprofit and community partners",
    taskList: "nonprofit",
    privacy: "nonprofit",
    points: { B9: 1, B3: 1 },
  },
];

// Question 2, one version per role.
const followUps = {
  teach: {
    tag: "For faculty and instructors",
    text: "How do you plan to use the Toolkit?",
    options: [
      { id: "own", label: "In my own teaching and course work", detail: "Save time on syllabi, feedback and course emails", points: { B2: 1, B6: 1 } },
      { id: "students", label: "To teach students about responsible AI", detail: "Bring the Toolkit into a course or class session", points: { B9: 2, B5: 1 } },
      { id: "both", label: "Both", detail: "Use it yourself and teach it", points: { B2: 1, B9: 1 } },
    ],
  },
  design: {
    tag: "For instructional designers",
    text: "What will you use the Toolkit for?",
    options: [
      { id: "workshops", label: "Running workshops for faculty or staff", points: { B4: 2 } },
      { id: "materials", label: "Building course or training materials", points: { B5: 1, B2: 1 } },
      { id: "support", label: "Supporting individual faculty", points: { B1: 1, B4: 1 } },
    ],
  },
  lead: {
    tag: "For department and program leaders",
    text: "What matters most for your department right now?",
    options: [
      { id: "expectations", label: "Setting expectations for responsible AI use", points: { B9: 1, B5: 1 } },
      { id: "training", label: "Getting my team trained", points: { B4: 2 } },
      { id: "privacy", label: "Protecting student data and privacy", points: { B9: 1 }, flag: "privateData" },
    ],
  },
  staff: {
    tag: "For university staff",
    text: "Which area do you work in?",
    options: [
      { id: "advising", label: "Advising or student services", points: { B3: 1, B6: 1 } },
      { id: "admin", label: "Administration or operations", points: { B3: 1, B5: 1 } },
      { id: "other", label: "Another area", points: {} },
    ],
  },
  student: {
    tag: "For students",
    text: "What do you want help with most?",
    options: [
      { id: "coursework", label: "Coursework and studying", points: { B1: 1, B5: 1 } },
      { id: "career", label: "Career and job search", points: { B6: 2 } },
      { id: "research", label: "Research projects", points: { B8: 1, B5: 1 } },
    ],
  },
  nonprofit: {
    tag: "For nonprofit and community partners",
    text: "What’s your role?",
    options: [
      { id: "staff", label: "Staff member", points: { B3: 1, B6: 1 } },
      { id: "volunteer", label: "Volunteer", points: { B1: 1, B9: 1 } },
      { id: "leadership", label: "Leadership or board", points: { B4: 1, B9: 1 } },
    ],
  },
};

// Question 4 task lists. Every unit listed for a task gets the rank points.
const taskLists = {
  teaching: [
    { id: "questions", label: "Answering student questions about my course", units: ["B2"] },
    { id: "meetings", label: "Meetings and follow-up emails", units: ["B3"] },
    { id: "writing", label: "Writing feedback, emails and documents", units: ["B6"] },
    { id: "materials", label: "Creating course or training materials", units: ["B5", "B4"] },
    { id: "research", label: "Research and analysis", units: ["B5", "B8"] },
    { id: "handoff", label: "Handing off work to TAs or staff", units: ["B4"] },
  ],
  leading: [
    { id: "meetings", label: "Meetings and follow-up emails", units: ["B3"] },
    { id: "writing", label: "Writing emails, reports and documents", units: ["B6"] },
    { id: "repeat", label: "Answering the same questions again and again", units: ["B2"] },
    { id: "delegating", label: "Delegating work to my team", units: ["B4"] },
    { id: "planning", label: "Planning and tracking projects", units: ["B5"] },
    { id: "research", label: "Research and analysis", units: ["B5", "B8"] },
  ],
  student: [
    { id: "papers", label: "Writing assignments and papers", units: ["B6", "B5"] },
    { id: "studying", label: "Studying and reviewing material", units: ["B2"] },
    { id: "research", label: "Research for projects", units: ["B8", "B5"] },
    { id: "group", label: "Group projects and meetings", units: ["B3"] },
    { id: "applications", label: "Job or internship applications", units: ["B6"] },
  ],
  nonprofit: [
    { id: "writing", label: "Writing emails, newsletters and grants", units: ["B6"] },
    { id: "meetings", label: "Meetings and follow-ups", units: ["B3"] },
    { id: "resources", label: "Creating resources for families or the public", units: ["B9"] },
    { id: "questions", label: "Answering common questions", units: ["B2"] },
    { id: "coordinating", label: "Coordinating volunteers or staff", units: ["B4"] },
  ],
};

// Question 5, one version per group of roles.
const privacyQuestions = {
  university: {
    text: "Do you work with student records or other private information?",
    help: "For example, grades, accommodations, advising notes or health information.",
    options: [
      { id: "yes", label: "Yes", points: { B9: 1 }, flag: "privateData", reason: "You said you work with student records or other private information." },
      { id: "no", label: "No", points: {} },
    ],
  },
  student: {
    text: "Do you use AI on graded coursework?",
    options: [
      { id: "yes", label: "Yes", points: { B1: 1 }, flag: "gradedWork", reason: "You said you use AI on graded coursework." },
      { id: "unsure", label: "Not sure if it’s allowed", points: { B1: 1 }, flag: "gradedWork", reason: "You said you’re not sure if AI is allowed on your coursework." },
      { id: "no", label: "No", points: {} },
    ],
  },
  nonprofit: {
    text: "Do you work with information about children, families or clients?",
    options: [
      { id: "yes", label: "Yes", points: { B9: 2 }, flag: "familyData", reason: "You said you work with information about children, families or clients." },
      { id: "no", label: "No", points: {} },
    ],
  },
};

const experienceQuestion = {
  id: "experience",
  text: "What’s your current experience with AI tools?",
  options: [
    { id: "new", label: "I’m new to AI tools", points: { B1: 1, B8: 1 } },
    { id: "some", label: "I’ve used AI tools a few times", points: { B1: 1, B5: 1 } },
    { id: "weekly", label: "I use AI tools every week", points: { B4: 1, B8: 1 } },
  ],
};

const problemQuestion = {
  id: "problem",
  text: "When you use AI, what’s the most common problem?",
  options: [
    { id: "off", label: "The answer isn’t what I asked for", points: { B1: 2, B5: 1 } },
    { id: "voice", label: "The writing doesn’t sound like me", points: { B6: 2 } },
    { id: "accuracy", label: "I’m not sure the answer is accurate", points: { B5: 1 }, flag: "accuracy" },
    { id: "model", label: "I don’t know which model or setting to use", points: { B8: 2 } },
    { id: "none", label: "I haven’t used AI enough to say", points: {} },
  ],
};

export const QUESTION_COUNT = 6;

// Short encouragement shown beside the question counter.
export const stepNotes = [
  "Let’s start with you",
  "Tailored to your role",
  "A quick one",
  "More than halfway there",
  "Almost done",
  "Last question",
];

// Answers that depend on the role; cleared when the role changes.
export const ROLE_DEPENDENT = ["followUp", "tasks", "privacy"];

export function findRole(roleId) {
  return roles.find((role) => role.id === roleId) ?? null;
}

// The 6 questions for a visitor. Until a role is chosen only question 1 can be
// shown, so the role question is required.
export function getQuestions(roleId) {
  const role = findRole(roleId);
  const roleQuestion = {
    id: "role",
    kind: "role",
    text: "What best describes your role?",
    help: "Your answer shapes the next few questions.",
    required: true,
    options: roles,
  };
  if (!role) return [roleQuestion];

  const followUp = followUps[role.id];
  const privacy = privacyQuestions[role.privacy];
  return [
    roleQuestion,
    { id: "followUp", kind: "single", tag: followUp.tag, text: followUp.text, options: followUp.options },
    { ...experienceQuestion, kind: "single" },
    {
      id: "tasks",
      kind: "rank",
      text: "Rank the tasks that take up most of your time",
      help: `Tap up to ${MAX_RANKED}, starting with the biggest time sink. Tap a ranked task again to remove it.`,
      options: taskLists[role.taskList].map((task) => ({
        ...task,
        points: Object.fromEntries(task.units.map((slug) => [slug, 1])),
      })),
    },
    { id: "privacy", kind: "single", text: privacy.text, help: privacy.help, options: privacy.options },
    { ...problemQuestion, kind: "single" },
  ];
}

// Every unit in curriculum order (used to break ties), with a link that opens
// it on the Curriculum page.
const unitOrder = curriculum.flatMap((category) =>
  category.topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    categoryTitle: category.title,
    href: `/curriculum#curriculum/${encodeURIComponent(topic.slug)}`,
  }))
);

export const allQuizUnits = unitOrder;
export const unitCount = unitOrder.length;

export function findUnit(slug) {
  return unitOrder.find((unit) => unit.slug === slug);
}

function reasonFor(question, option, rank) {
  if (question.kind === "rank") return `You ranked “${option.label}” #${rank}.`;
  if (option.reason) return option.reason;
  return `You said: “${option.label}.”`;
}

function startReason(flags) {
  const opener = "We recommend everyone start with this unit.";
  if (flags.privateData) {
    return `${opener} You said you work with student records or other private information, and this unit explains how to remove names and details before using AI.`;
  }
  if (flags.familyData) {
    return `${opener} You said you work with information about children, families or clients, and this unit explains how to remove names and details before using AI.`;
  }
  if (flags.gradedWork) {
    return `${opener} You said you use AI on coursework, and this unit explains why to say where you used AI and how to check what it gives you.`;
  }
  if (flags.accuracy) {
    return `${opener} It also explains how to check AI answers for accuracy.`;
  }
  return `${opener} It covers when to use AI, when to involve a person and how to protect private information.`;
}

// answers: { role: [roleId], followUp: [optionId], tasks: [first, second, third], ... }
export function recommend(answers) {
  const roleId = answers.role?.[0];
  const role = findRole(roleId);
  const score = {};
  // The answer that added the most points to each unit, shown as its reason.
  const bestReason = {};
  const flags = {};

  for (const question of getQuestions(roleId)) {
    (answers[question.id] ?? []).forEach((optionId, index) => {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) return;
      if (option.flag) flags[option.flag] = true;
      const weight = question.kind === "rank" ? (RANK_POINTS[index] ?? 0) : 1;
      for (const [slug, base] of Object.entries(option.points)) {
        const points = base * weight;
        if (points <= 0) continue;
        score[slug] = (score[slug] ?? 0) + points;
        if (!bestReason[slug] || points > bestReason[slug].points) {
          bestReason[slug] = { text: reasonFor(question, option, index + 1), points };
        }
      }
    });
  }

  // Array.prototype.sort is stable, so ties keep curriculum order.
  const ranked = unitOrder
    .filter((unit) => unit.slug !== START_UNIT && (score[unit.slug] ?? 0) > 0)
    .sort((a, b) => (score[b.slug] ?? 0) - (score[a.slug] ?? 0));

  const picks = ranked.slice(0, 3);
  for (const slug of FALLBACK_UNITS) {
    if (picks.length >= 3) break;
    const unit = findUnit(slug);
    if (unit && !picks.includes(unit)) picks.push(unit);
  }

  return {
    role,
    start: { unit: findUnit(START_UNIT), reason: startReason(flags) },
    picks: picks.map((unit) => ({
      unit,
      reason: bestReason[unit.slug]?.text ?? "Recommended for most new users.",
    })),
    others: unitOrder.filter((unit) => unit.slug !== START_UNIT && !picks.includes(unit)),
  };
}

// Recommended unit slugs from the quiz saved in this browser tab, used by the
// progress page. Returns an empty list if the quiz wasn't finished.
export const QUIZ_STORAGE_KEY = "rat-quiz-progress";

export function savedRecommendations() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(QUIZ_STORAGE_KEY));
    if (!saved?.answers?.role?.length || !saved.done) return [];
    const { start, picks } = recommend(saved.answers);
    return [start.unit.slug, ...picks.map((pick) => pick.unit.slug)];
  } catch {
    return [];
  }
}
