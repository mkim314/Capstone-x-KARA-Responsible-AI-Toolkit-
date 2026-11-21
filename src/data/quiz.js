// Questions and scoring for the intake quiz on /quiz.
// Each answer adds points to one or more curriculum units (by unit slug in
// curriculum.js). The 3 highest-scoring units are recommended after the start
// unit. Edit questions, answers or points here; no other file needs to change.
import { curriculum } from "./curriculum";

// Everyone is shown this unit first.
export const START_UNIT = "B7";

// Used when the visitor skips enough questions that fewer than 3 units score.
export const FALLBACK_UNITS = ["B1", "B5", "B8"];

// flags.privateData: the visitor works with student records or other private information.
// flags.accuracy: the visitor is unsure whether AI answers are accurate.
export const questions = [
  {
    id: "role",
    text: "What best describes your role?",
    options: [
      { id: "teach", label: "I teach courses", points: { B2: 1 } },
      { id: "design", label: "I design courses or learning materials", points: { B4: 1, B5: 1 } },
      { id: "lead", label: "I lead a department or program", points: { B3: 1, B4: 1 } },
      { id: "staff", label: "I work in a staff role, such as advising or administration", points: { B3: 1, B6: 1 } },
    ],
  },
  {
    id: "experience",
    text: "What’s your current experience with AI tools?",
    options: [
      { id: "new", label: "I’m new to AI tools", points: { B1: 1, B8: 1 } },
      { id: "some", label: "I’ve used AI tools a few times", points: { B1: 1, B5: 1 } },
      { id: "weekly", label: "I use AI tools every week", points: { B4: 1, B8: 1 } },
    ],
  },
  {
    id: "goal",
    text: "What’s your main goal?",
    options: [
      { id: "own", label: "Use AI in my own work", points: { B3: 1, B6: 1 } },
      { id: "students", label: "Teach students to use AI responsibly", points: { B9: 2, B5: 1 } },
      { id: "colleagues", label: "Help colleagues in my department use AI", points: { B4: 2 } },
    ],
  },
  {
    id: "tasks",
    text: "Which tasks take up the most of your time?",
    multiple: true,
    options: [
      { id: "questions", label: "Answering student questions about my course", points: { B2: 2 } },
      { id: "meetings", label: "Meetings and follow-up emails", points: { B3: 2 } },
      { id: "writing", label: "Writing feedback, emails and documents", points: { B6: 2 } },
      { id: "research", label: "Research and analysis", points: { B5: 1, B8: 1 } },
      { id: "handoff", label: "Handing off work to TAs or staff", points: { B4: 2 } },
    ],
  },
  {
    id: "private",
    text: "Do you work with student records or other private information?",
    help: "For example, grades, accommodations, advising notes or health information.",
    options: [
      { id: "yes", label: "Yes", points: { B9: 1 }, flags: { privateData: true } },
      { id: "no", label: "No", points: {} },
    ],
  },
  {
    id: "problem",
    text: "When you use AI, what’s the most common problem?",
    options: [
      { id: "off", label: "The answer isn’t what I asked for", points: { B1: 2, B5: 1 } },
      { id: "voice", label: "The writing doesn’t sound like me", points: { B6: 2 } },
      { id: "accuracy", label: "I’m not sure the answer is accurate", points: { B5: 1 }, flags: { accuracy: true } },
      { id: "model", label: "I don’t know which model or setting to use", points: { B8: 2 } },
      { id: "none", label: "I haven’t used AI enough to say", points: {} },
    ],
  },
];

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

export const unitCount = unitOrder.length;

export function findUnit(slug) {
  return unitOrder.find((unit) => unit.slug === slug);
}

// answers: { [questionId]: [optionId, ...] }
export function recommend(answers) {
  const score = {};
  // The answer that added the most points to each unit, shown as its reason.
  const bestReason = {};
  let privateData = false;
  let accuracy = false;

  for (const question of questions) {
    for (const optionId of answers[question.id] ?? []) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      if (option.flags?.privateData) privateData = true;
      if (option.flags?.accuracy) accuracy = true;
      for (const [slug, points] of Object.entries(option.points)) {
        score[slug] = (score[slug] ?? 0) + points;
        if (!bestReason[slug] || points > bestReason[slug].points) {
          bestReason[slug] = { label: option.label, points };
        }
      }
    }
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

  const startReason = privateData
    ? "We recommend everyone start with this unit. You said you work with student records or other private information, and this unit explains how to remove names and details before using AI."
    : accuracy
      ? "We recommend everyone start with this unit. It also explains how to check AI answers for accuracy."
      : "We recommend everyone start with this unit. It covers when to use AI, when to involve a person and how to protect private information.";

  return {
    start: { unit: findUnit(START_UNIT), reason: startReason },
    picks: picks.map((unit) => ({
      unit,
      reason: bestReason[unit.slug]
        ? `You said: “${bestReason[unit.slug].label}”`
        : "Recommended for most new users.",
    })),
    others: unitOrder.filter((unit) => unit.slug !== START_UNIT && !picks.includes(unit)),
  };
}
