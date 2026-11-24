// Questions, answers and routing for the intro quiz on /quiz.
// Source of truth: the Intro Quiz Specs doc (team Drive). Section numbers in
// the comments below point to that doc.
//
// Everyone answers 6 questions. Question 1 (audience) decides the follow-up
// in question 2 and the wording of question 5. Answers add points to tags;
// each unit lists its tags in curriculum.js; the three units with the most
// points are recommended after the start units. Answer IDs are what gets
// saved in the browser, so keep them stable even if the wording changes.
import { curriculum } from "./curriculum";

// Section 1: units everyone gets, in order. Add the ID of Adam's foundation
// unit at the front of this list once it exists in curriculum.js.
export const START_UNITS = ["B7"];

// Section 4: used when fewer than 3 units have points (for example when most
// questions are skipped).
export const FALLBACK_UNITS = ["B1", "B5", "B8"];

// Section 3, question 4: people rank only the tasks that apply to them; a
// task left unranked counts as not applying. Points for rank 1, 2 and 3;
// lower ranks are saved but don't change the recommendations.
export const RANK_POINTS = [3, 2, 1];

export const QUESTION_COUNT = 6;

// Section 3, question 1. `privacy` picks the wording of question 5.
export const audiences = [
  {
    id: "educators-students",
    label: "Educators & Students",
    detail: "Faculty, staff, K-12 and students",
    icon: "book",
    privacy: "education",
    tags: { teaching: 1, "sharing-info": 1 },
    subtypes: [
      { id: "nontech-faculty-admin", label: "Non-Technical Faculty & Administrators", tags: { prompting: 1, "sharing-info": 1 } },
      { id: "cel-office-staff", label: "Community-Engaged Learning Office Staff", tags: { equity: 1, meetings: 1 } },
      { id: "greek-philanthropy", label: "Sorority & Fraternity Philanthropy Chairs", tags: { writing: 1, delegation: 1 } },
      { id: "k12-admin", label: "K-12 Administrators", tags: { delegation: 1, "sharing-info": 1 } },
      { id: "k12-counselor", label: "K-12 Counselors", tags: { writing: 1 } },
      { id: "educators-general", label: "Educators & Students - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    detail: "Organizations that work with Seeds of Success",
    icon: "handshake",
    privacy: "records",
    tags: { delegation: 1, writing: 1 },
    subtypes: [
      { id: "nonprofit-partners", label: "Nonprofit partner organizations", tags: { equity: 1, meetings: 1 } },
      { id: "university-research-partners", label: "University & research partners", tags: { accuracy: 1, "sharing-info": 1 } },
      { id: "corporate-partners", label: "Corporate & business partners", tags: { writing: 1, delegation: 1 } },
      { id: "government-agency-partners", label: "Government agency partners", tags: { accuracy: 1, done: 1 } },
      { id: "partners-general", label: "Partners - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "funders-donors",
    label: "Funders & Donors",
    detail: "Foundations, companies and individual donors",
    icon: "gift",
    privacy: "others",
    tags: { writing: 1, accuracy: 1 },
    subtypes: [
      { id: "grant-program-officers", label: "Foundation & grant program officers", tags: { accuracy: 1, writing: 1 } },
      { id: "corporate-giving", label: "Corporate giving & CSR teams", tags: { writing: 1, done: 1 } },
      { id: "individual-donors", label: "Individual donors", tags: { prompting: 1 } },
      { id: "funders-general", label: "Funders & Donors - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "policy-government",
    label: "Policy Makers & Government",
    detail: "Elected officials, agencies and boards",
    icon: "building",
    privacy: "records",
    tags: { accuracy: 1, equity: 1 },
    subtypes: [
      { id: "elected-officials", label: "Elected officials & staff", tags: { writing: 1, accuracy: 1 } },
      { id: "agency-staff", label: "Agency staff", tags: { meetings: 1, delegation: 1 } },
      { id: "school-board", label: "School board members", tags: { equity: 1, meetings: 1 } },
      { id: "policy-general", label: "Policy Makers & Government - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "media-press",
    label: "Media & Press",
    detail: "Reporters, editors and creators",
    icon: "mic",
    privacy: "others",
    tags: { accuracy: 1, writing: 1 },
    subtypes: [
      { id: "journalists", label: "Journalists & reporters", tags: { accuracy: 1, equity: 1 } },
      { id: "editors-producers", label: "Editors & producers", tags: { done: 1, delegation: 1 } },
      { id: "content-creators", label: "Content creators & podcasters", tags: { writing: 1, "tool-choice": 1 } },
      { id: "media-general", label: "Media & Press - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "frontline-community",
    label: "Frontline Workers & Community Organizations",
    detail: "Case workers, coordinators and volunteers",
    icon: "users",
    privacy: "records",
    tags: { meetings: 1, equity: 1 },
    subtypes: [
      { id: "case-managers", label: "Case managers & social workers", tags: { meetings: 1, writing: 1 } },
      { id: "program-coordinators", label: "Program coordinators", tags: { delegation: 1, done: 1 } },
      { id: "volunteers", label: "Volunteers", tags: { prompting: 1, equity: 1 } },
      { id: "community-leaders", label: "Community organization leaders", tags: { delegation: 1, equity: 1 } },
      { id: "frontline-general", label: "Frontline - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "families-youth-survivors",
    label: "Families, Youth & Survivors",
    detail: "Parents, caregivers, young people and survivors",
    icon: "heart",
    privacy: "personal",
    tags: { prompting: 1, equity: 1 },
    subtypes: [
      { id: "parents-caregivers", label: "Parents & caregivers", tags: { prompting: 1, equity: 1 } },
      { id: "youth", label: "Youth", tags: { prompting: 1, "tool-choice": 1 } },
      { id: "survivors", label: "Survivors & people receiving services", tags: { equity: 1 } },
      { id: "families-general", label: "Families, Youth & Survivors - General", tags: { prompting: 1 } },
    ],
  },
  {
    id: "general-public",
    label: "General Public",
    detail: "Anyone curious about using AI well",
    icon: "globe",
    privacy: "others",
    tags: { prompting: 1, "tool-choice": 1 },
    subtypes: [
      { id: "curious", label: "Curious about AI", tags: { prompting: 1, "tool-choice": 1 } },
      { id: "using-at-work", label: "Using AI at work", tags: { delegation: 1, done: 1 } },
      { id: "learning-for-school", label: "Learning AI for school", tags: { prompting: 1, accuracy: 1 } },
      { id: "public-general", label: "General Public - General", tags: { prompting: 1 } },
    ],
  },
];

// Section 3, question 3.
const experienceOptions = [
  { id: "new", label: "I’m new to AI tools", tags: { prompting: 1, "tool-choice": 1 } },
  { id: "some", label: "I’ve used them a few times", tags: { prompting: 1, done: 1 } },
  { id: "weekly", label: "I use them every week", tags: { delegation: 1, "tool-choice": 1 } },
];

// Section 3, question 4. One list for every audience so labels stay shared.
export const tasks = [
  { id: "T1", label: "Writing emails, letters and reports", tags: { writing: 1 } },
  { id: "T2", label: "Meetings, notes and follow-ups", tags: { meetings: 1 } },
  { id: "T3", label: "Answering the same questions again and again", tags: { "sharing-info": 1 } },
  { id: "T4", label: "Creating materials for students, families or the public", tags: { equity: 1, teaching: 1 } },
  { id: "T5", label: "Research and checking information", tags: { accuracy: 1, "tool-choice": 1 } },
  { id: "T6", label: "Handing work off to staff, volunteers or teammates", tags: { delegation: 1 } },
  { id: "T7", label: "Planning projects and tracking progress", tags: { done: 1 } },
];

// Section 3, question 5, worded by audience group. It changes the reason
// shown on Responsible Use Basics and doesn't change the other units.
const privacyWording = {
  education: {
    text: "Do you work with student records or other private information?",
    help: "For example, grades, accommodations, advising or counseling notes.",
  },
  records: { text: "Do you work with client, case or other private records?" },
  others: { text: "Do you handle other people’s private information, such as donor, source or customer details?" },
  personal: { text: "Would you use AI with personal or family information?" },
};

const privacyOptions = [
  { id: "yes", label: "Yes", flag: "privateInfo" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure", flag: "privateInfo" },
];

// Section 3, question 6.
const problemOptions = [
  { id: "off-target", label: "The answer isn’t what I asked for", tags: { prompting: 2, done: 1 } },
  { id: "voice", label: "The writing doesn’t sound like me", tags: { writing: 2 } },
  { id: "accuracy", label: "I’m not sure the answer is accurate", tags: { accuracy: 2 }, flag: "accuracy" },
  { id: "model", label: "I don’t know which model or setting to use", tags: { "tool-choice": 2 } },
  { id: "not-enough", label: "I haven’t used AI enough to say", tags: {} },
];

// Short encouragement shown beside the question counter.
export const stepNotes = [
  "Let’s start with you",
  "Tailored to you",
  "A quick one",
  "More than halfway there",
  "Almost done",
  "Last question",
];

// Section 6: answer fields saved in the browser. Changing the audience clears
// the answers that depend on it.
export const AUDIENCE_DEPENDENT = ["subtype"];

export function findAudience(audienceId) {
  return audiences.find((audience) => audience.id === audienceId) ?? null;
}

// The 6 questions for a visitor. Until an audience is chosen only question 1
// can be shown, so question 1 is required.
export function getQuestions(audienceId) {
  const audienceQuestion = {
    id: "audience",
    kind: "audience",
    text: "Which best describes you?",
    help: "Your answer shapes the next few questions.",
    required: true,
    options: audiences,
  };
  const audience = findAudience(audienceId);
  if (!audience) return [audienceQuestion];

  const privacy = privacyWording[audience.privacy];
  return [
    audienceQuestion,
    { id: "subtype", kind: "single", tag: audience.label, text: "Which of these fits you best?", options: audience.subtypes },
    { id: "experience", kind: "single", text: "How much have you used AI tools?", options: experienceOptions },
    {
      id: "taskRanking",
      kind: "rank",
      text: "Rank these tasks by how much of your time they take.",
      help: "Tap the tasks you spend time on, starting with the biggest. Leave out any that don’t apply to you.",
      options: tasks,
    },
    { id: "privateInfo", kind: "single", text: privacy.text, help: privacy.help, options: privacyOptions },
    { id: "commonProblem", kind: "single", text: "When you use AI, what’s the most common problem?", options: problemOptions },
  ];
}

// Every unit in curriculum order (used to break ties), with its tags and a
// link that opens it on the Curriculum page.
const unitOrder = curriculum.flatMap((category) =>
  category.topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    categoryTitle: category.title,
    tags: topic.tags ?? [],
    href: `/curriculum#curriculum/${encodeURIComponent(topic.slug)}`,
  }))
);

export const allQuizUnits = unitOrder;
export const unitCount = unitOrder.length;

export function findUnit(slug) {
  return unitOrder.find((unit) => unit.slug === slug);
}

function startReason(slug, flags) {
  if (slug !== "B7") return "We recommend everyone start with this unit.";
  const opener = "We recommend everyone start with this unit.";
  if (flags.privateInfo) {
    return `${opener} You said you work with private information, and this unit explains how to remove names and details before using AI.`;
  }
  if (flags.accuracy) {
    return `${opener} You said you’re not sure AI answers are accurate, and this unit explains how to check them before you share anything.`;
  }
  return `${opener} It covers when to use AI, when to involve a person and how to protect private information.`;
}

// answers (section 6 field names):
// { audience, subtype, experience, taskRanking: [...], privateInfo, commonProblem }
export function recommend(answers) {
  const audience = findAudience(answers.audience);
  const subtype = audience?.subtypes.find((s) => s.id === answers.subtype) ?? null;
  const tagPoints = {};
  // Every answer that gave each tag points. A unit shows its strongest reason
  // that another recommended unit isn't already showing.
  const tagReasons = {};
  const flags = {};

  function add(tags, weight, reason) {
    for (const [tag, base] of Object.entries(tags ?? {})) {
      const points = base * weight;
      if (points <= 0) continue;
      tagPoints[tag] = (tagPoints[tag] ?? 0) + points;
      (tagReasons[tag] ??= []).push({ text: reason, points });
    }
  }

  if (audience) add(audience.tags, 1, `You said: “${audience.label}.”`);
  if (subtype) add(subtype.tags, 1, `You said: “${subtype.label}.”`);

  const experience = experienceOptions.find((o) => o.id === answers.experience);
  if (experience) add(experience.tags, 1, `You said: “${experience.label}.”`);

  (answers.taskRanking ?? []).forEach((taskId, index) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) add(task.tags, RANK_POINTS[index] ?? 0, `You ranked “${task.label}” #${index + 1}.`);
  });

  const privacy = privacyOptions.find((o) => o.id === answers.privateInfo);
  if (privacy?.flag) flags[privacy.flag] = true;

  const problem = problemOptions.find((o) => o.id === answers.commonProblem);
  if (problem) {
    add(problem.tags, 1, `You said: “${problem.label}.”`);
    if (problem.flag) flags[problem.flag] = true;
  }

  const scored = unitOrder
    .filter((unit) => !START_UNITS.includes(unit.slug))
    .map((unit) => {
      const score = unit.tags.reduce((sum, tag) => sum + (tagPoints[tag] ?? 0), 0);
      const reasons = unit.tags.flatMap((tag) => tagReasons[tag] ?? []).sort((a, b) => b.points - a.points);
      return { unit, score, reasons };
    })
    .filter((entry) => entry.score > 0)
    // Array.prototype.sort is stable, so ties keep curriculum order.
    .sort((a, b) => b.score - a.score);

  const used = new Set();
  const picks = scored.slice(0, 3).map(({ unit, score, reasons }) => {
    const reason = reasons.find((r) => !used.has(r.text)) ?? reasons[0];
    used.add(reason.text);
    return { unit, score, reason: reason.text };
  });
  for (const slug of FALLBACK_UNITS) {
    if (picks.length >= 3) break;
    const unit = findUnit(slug);
    if (unit && !picks.some((pick) => pick.unit.slug === slug)) {
      picks.push({ unit, score: 0, reason: "Recommended for most new users." });
    }
  }

  const starts = START_UNITS.map(findUnit)
    .filter(Boolean)
    .map((unit) => ({ unit, reason: startReason(unit.slug, flags) }));
  const chosen = new Set([...starts, ...picks].map((entry) => entry.unit.slug));

  return {
    audience,
    subtype,
    starts,
    picks: picks.map(({ unit, reason }) => ({ unit, reason })),
    others: unitOrder.filter((unit) => !chosen.has(unit.slug)),
  };
}

// Section 6: the quiz keeps its progress in this browser tab only.
export const QUIZ_STORAGE_KEY = "rat-quiz-progress";

// Recommended unit IDs from the quiz finished in this tab, used by the
// progress page. Empty if the quiz wasn't finished.
export function savedRecommendations() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(QUIZ_STORAGE_KEY));
    if (!saved?.done || !saved.answers?.audience) return [];
    const { starts, picks } = recommend(saved.answers);
    return [...starts, ...picks].map((entry) => entry.unit.slug);
  } catch {
    return [];
  }
}
