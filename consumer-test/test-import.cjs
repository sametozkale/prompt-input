/**
 * Consumer test: verify prompt-input install and CJS import.
 * Run: node test-import.cjs
 * (Types like PromptData exist only in .d.ts; they are not runtime exports.)
 */
const pkg = require("@sametozkale/prompt-input");

const requiredValues = [
  "AIPromptInput",
  "DEFAULT_AGENTS",
  "DEFAULT_RESEARCH_MODELS",
  "DEFAULT_CONNECTOR_SOURCES",
];

let failed = 0;
for (const name of requiredValues) {
  if (!(name in pkg)) {
    console.error("Missing export:", name);
    failed++;
  }
}
if (typeof pkg.AIPromptInput !== "function") {
  console.error("AIPromptInput is not a function:", typeof pkg.AIPromptInput);
  failed++;
}
if (!Array.isArray(pkg.DEFAULT_AGENTS)) {
  console.error("DEFAULT_AGENTS is not an array");
  failed++;
}

if (failed) {
  process.exit(1);
}
console.log("OK: CJS import works. AIPromptInput and default arrays present.");
