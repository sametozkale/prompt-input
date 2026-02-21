"use client";

import { useCallback, useEffect, useState } from "react";
import { codeToHtml } from "shiki";

const LANG_MAP: Record<string, string> = {
  Bash: "bash",
  React: "tsx",
  JavaScript: "javascript",
  TypeScript: "typescript",
  CSS: "css",
  HTML: "html",
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeBlockCode({
  code,
  language = "tsx",
  theme = "github-light",
}: {
  code: string;
  language?: string;
  theme?: string;
}) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setHtml("<pre><code></code></pre>");
      return;
    }
    codeToHtml(code, { lang: language, theme })
      .then(setHtml)
      .catch(() => {
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        setHtml(`<pre><code>${escaped}</code></pre>`);
      });
  }, [code, language, theme]);

  return html ? (
    <div
      className="code-block-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <div className="code-block-content">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CodeBlock({
  lang,
  filename,
  code,
}: {
  lang: string;
  filename: string;
  code: string;
}) {
  const handleCopy = useCallback(() => {
    const btn = document.activeElement as HTMLButtonElement;
    navigator.clipboard.writeText(code).then(() => {
      btn?.classList.add("copied");
      setTimeout(() => btn?.classList.remove("copied"), 2000);
    }).catch(() => {});
  }, [code]);

  return (
    <div className="code-block-group">
      <div className="code-block-header">
        <span className="code-block-lang">{lang}</span>
        <span className="code-block-filename">{filename}</span>
        <button
          type="button"
          className="code-block-copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          <span className="icon-copy">
            <CopyIcon />
          </span>
          <span className="icon-check">
            <CheckIcon />
          </span>
        </button>
      </div>
      <CodeBlockCode
        code={code}
        language={LANG_MAP[lang] || lang.toLowerCase()}
      />
    </div>
  );
}
