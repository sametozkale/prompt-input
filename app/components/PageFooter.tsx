const NPM_URL = "https://www.npmjs.com/package/@sametozkale/prompt-input";

/** Prompt pre-filled when opening in Cursor: install + minimal usage. */
const CURSOR_PROMPT = [
  "Add @sametozkale/prompt-input to my project.",
  "Run: npm install @sametozkale/prompt-input framer-motion @radix-ui/react-dropdown-menu @radix-ui/react-select lucide-react",
  "Then add a usage example with AIPromptInput from '@sametozkale/prompt-input'.",
].join("\n");

const CURSOR_URL = `https://cursor.com/link/prompt?text=${encodeURIComponent(CURSOR_PROMPT)}`;
const V0_PROMPT = "Add the prompt input component from @sametozkale/prompt-input to my app. Install: npm install @sametozkale/prompt-input and peer deps. Use AIPromptInput from '@sametozkale/prompt-input'.";
const V0_URL = `https://v0.dev/chat?prompt=${encodeURIComponent(V0_PROMPT)}`;

const CURSOR_LINK_TITLE = "Opens Cursor with a prompt to add @sametozkale/prompt-input to your project (new tab)";
const V0_LINK_TITLE = "Opens v0.dev with a prompt to add @sametozkale/prompt-input (new tab)";

export function PageFooter() {
  return (
    <footer className="page-footer">
      <hr className="page-footer-divider" />
      <div className="page-footer-links">
        <a href={NPM_URL} target="_blank" rel="noopener noreferrer" title="View @sametozkale/prompt-input on npm">
          View on npm
        </a>
        <a
          href={CURSOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={CURSOR_LINK_TITLE}
          aria-label={CURSOR_LINK_TITLE}
        >
          Open in Cursor
        </a>
        <a
          href={V0_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={V0_LINK_TITLE}
          aria-label={V0_LINK_TITLE}
        >
          Open in v0
        </a>
      </div>
      Developed by{" "}
      <a
        href="https://samet.works/"
        target="_blank"
        rel="noopener noreferrer"
      >
        samet.works
      </a>{" "}
      in 2026.
    </footer>
  );
}

export { NPM_URL, CURSOR_URL, V0_URL, V0_PROMPT, CURSOR_PROMPT, CURSOR_LINK_TITLE, V0_LINK_TITLE };
