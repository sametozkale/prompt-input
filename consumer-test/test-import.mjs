/**
 * Consumer test: ESM import from prompt-input.
 * Run: node test-import.mjs
 */
import {
  AIPromptInput,
  DEFAULT_AGENTS,
  DEFAULT_RESEARCH_MODELS,
  DEFAULT_CONNECTOR_SOURCES,
} from "prompt-input";

if (typeof AIPromptInput !== "function") {
  console.error("AIPromptInput is not a function:", typeof AIPromptInput);
  process.exit(1);
}
if (!Array.isArray(DEFAULT_AGENTS)) {
  console.error("DEFAULT_AGENTS is not an array");
  process.exit(1);
}
console.log("OK: ESM import works. AIPromptInput and default arrays present.");
