#!/usr/bin/env node
// Sanity-checks js/levels.js so typos are caught before they reach the site.
// Usage: node scripts/check-levels.js
const path = require("path");
const { LEVEL_TYPES, TAGS, WORLDS, BONUS_AREAS } = require(path.join(__dirname, "..", "js", "levels.js"));

const problems = [];
const seen = new Set();
const required = ["id", "name", "type", "tags", "difficulty", "desc", "tip"];

function check(level, where) {
  required.forEach((field) => {
    if (level[field] === undefined || level[field] === "") problems.push(`${where}: missing "${field}"`);
  });
  if (seen.has(level.id)) problems.push(`${where}: duplicate id "${level.id}"`);
  seen.add(level.id);
  if (!LEVEL_TYPES[level.type]) {
    problems.push(`${where}: unknown type "${level.type}" (use one of: ${Object.keys(LEVEL_TYPES).join(", ")})`);
  }
  (level.tags || []).forEach((t) => {
    if (!TAGS[t]) problems.push(`${where}: unknown tag "${t}" (use one of: ${Object.keys(TAGS).join(", ")})`);
  });
  if (!Number.isInteger(level.difficulty) || level.difficulty < 1 || level.difficulty > 5) {
    problems.push(`${where}: difficulty must be a whole number from 1 to 5`);
  }
  if (level.enemies !== undefined && !Array.isArray(level.enemies)) {
    problems.push(`${where}: "enemies" must be a list, e.g. ["Goomba", "Koopa Troopa"]`);
  }
}

WORLDS.forEach((world) => {
  if (world.levels.length !== 4) problems.push(`World ${world.number}: expected 4 levels, found ${world.levels.length}`);
  world.levels.forEach((level, i) => {
    const where = `World ${world.number}, level ${level.id || i + 1}`;
    if (level.id && level.id !== `${world.number}-${i + 1}`) {
      problems.push(`${where}: id should be "${world.number}-${i + 1}"`);
    }
    check(level, where);
  });
});
BONUS_AREAS.forEach((level, i) => check(level, `Bonus area ${level.id || i + 1}`));

if (problems.length) {
  console.error(`✗ Found ${problems.length} problem(s) in js/levels.js:\n  - ` + problems.join("\n  - "));
  process.exit(1);
}
console.log(`✓ js/levels.js looks good (${seen.size} levels checked).`);
