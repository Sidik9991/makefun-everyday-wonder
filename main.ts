// Everyday Wonder — one sentence, 1–200 characters, on a small moment of
// wonder in everyday life. Candidates are scored 0–2 on the judge's five
// criteria, in the judge's own order, weighted 5/4/3/2/1:
//   1 (w5) catches a small moment of wonder in everyday life, one sentence
//   2 (w4) turns the moment at an angle the reader has not met before
//   3 (w3) lands its surprise in one read, a single clear sentence
//   4 (w2) grounded in something real and specific
//   5 (w1) every word working, no filler, no worn phrase
// The winner is written to /output/entry.txt, re-read and gate-checked.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WEIGHTS = [5, 4, 3, 2, 1];

interface Candidate {
  text: string;
  scores: [number, number, number, number, number];
}

const CANDIDATES: Candidate[] = [
  {
    // The elevator's courtesy for a passenger who isn't there.
    text: "The elevator stops at a floor nobody pressed, opens onto nobody, and waits a courteous moment before closing, just in case.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    // A habit of kindness outliving the man it was for.
    text: "Every morning the bus driver brakes a fraction softer at the stop where the old man fed pigeons, though the old man died in March.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    // A lone glove riding up like an offering.
    text: "The escalator carries a single dropped glove upward, solemn as an offering, to a floor where no hand is waiting.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    // A sparrow obeying a signal not meant for her.
    text: "A sparrow lands on the traffic light and waits, perfectly still, for a green that is not meant for her.",
    scores: [2, 1, 2, 2, 2],
  },
  {
    // Rain as the sky countersigning finished work.
    text: "Rain starts the exact moment the street sweeper reaches the end of the block, as if the sky were signing his work.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // Freezer air folding forty years into one breath.
    text: "The supermarket freezer exhales cold air onto my ankles, and suddenly I am eight years old, choosing ice cream like it matters.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // The fridge light staging a midnight show for no audience.
    text: "The fridge light comes on at 2 a.m. and for a moment the kitchen is a small, cold stage where the leftovers perform for no one.",
    scores: [2, 1, 1, 2, 1],
  },
  // --- Pass 2 challengers ---
  {
    // A wave answered where no one can see it. The answering wave is
    // imagined rather than real, so criterion 4 scores it down.
    text: "A toddler waves at the security camera, and somewhere a tired guard waves back at a screen.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    // Wet crosswalk stripes as piano keys underfoot.
    text: "After the rain, the crosswalk stripes shine so white that crossing the street feels like walking across piano keys.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    // The washing machine's end-of-cycle song, applauded by the house.
    text: "The washing machine finishes and plays its little song, and the whole house, without deciding to, feels slightly proud.",
    scores: [2, 1, 2, 2, 1],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function charCount(s: string): number {
  return [...s].length;
}

function gate(text: string): string[] {
  const problems: string[] = [];
  const n = charCount(text);
  if (n < 1 || n > 200) problems.push(`length ${n} outside 1..200`);
  if (text.trim().length === 0) problems.push("only whitespace");
  // A single sentence: one terminal mark, at the end, and none inside.
  if (!/[.!?]$/.test(text)) problems.push("does not end with sentence punctuation");
  const body = text.slice(0, -1);
  if (/[.!?]/.test(body)) problems.push("more than one sentence");
  return problems;
}

function main(): void {
  const ranked = [...CANDIDATES].sort((a, b) => total(b) - total(a));
  for (const c of ranked) {
    console.log(`${total(c)}  ${c.text}`);
  }
  const winner = ranked[0];
  const problems = gate(winner.text);
  if (problems.length > 0) {
    console.error(`GATE FAIL for winning line: ${problems.join("; ")}`);
    process.exit(1);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", winner.text, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== winner.text) {
    console.error("GATE FAIL: /output/entry.txt does not match the winning line");
    process.exit(1);
  }
  const backProblems = gate(back);
  if (backProblems.length > 0) {
    console.error(`GATE FAIL on re-read: ${backProblems.join("; ")}`);
    process.exit(1);
  }
  console.log(`WINNER (${charCount(back)} chars): ${back}`);
}

main();
