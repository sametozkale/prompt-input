"use client";

import { useCallback } from "react";
import { AIPromptInput } from "@/src";
import type { PromptData } from "@/src";
import { PageHeader } from "./components/PageHeader";
import { PageFooter, NPM_URL, CURSOR_URL, V0_URL, CURSOR_LINK_TITLE, V0_LINK_TITLE } from "./components/PageFooter";
import { CodeBlock } from "./components/CodeBlock";
import { DemoErrorBoundary } from "./components/DemoErrorBoundary";

function NpmIcon() {
  return (
    <svg
      fill="#CB3837"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m512 325.5c0 7.124 0 14.24-.041 21.364-.034 5.999-.103 11.998-.268 17.99-.356 13.068-1.124 26.245-3.448 39.169-2.359 13.109-6.205 25.306-12.266 37.222-5.958 11.703-13.746 22.419-23.029 31.709-9.29 9.29-20 17.072-31.71 23.03-11.909 6.061-24.113 9.907-37.222 12.266-12.923 2.324-26.101 3.092-39.169 3.448-5.999.165-11.991.233-17.99.268-7.123.048-14.24.041-21.364.041h-139c-7.124 0-14.24 0-21.364-.041-5.999-.035-11.998-.103-17.99-.268-13.068-.356-26.245-1.124-39.169-3.448-13.109-2.359-25.306-6.205-37.2219-12.266-11.7033-5.958-22.4194-13.746-31.7095-23.03-9.29-9.29-17.0717-19.999-23.0296-31.709-6.0608-11.909-9.90707-24.113-12.26557-37.222-2.32422-12.924-3.0921-26.101-3.448618-39.169-.164546-5.999-.2331071-11.991-.2673876-17.99-.0274244-7.124-.0274244-14.24-.0274244-21.364v-139c0-7.124 0-14.24.0411366-21.364.0342805-5.999.1028414-11.998.2673884-17.99.356517-13.068 1.124405-26.245 3.448615-39.169 2.3585-13.1091 6.20478-25.3061 12.26556-37.222 5.958-11.7034 13.7465-22.4195 23.0297-31.7095 9.29-9.29 19.9992-17.0717 31.7094-23.0296 11.9091-6.06084 24.1129-9.90711 37.2222-12.26561 12.923-2.32422 26.101-3.092104 39.169-3.448622 5.999-.164546 11.991-.233107 17.99-.2673875 7.117-.0342805 14.233-.0342805 21.357-.0342805h139c7.124 0 14.24 0 21.364.0411366 5.999.0342805 11.998.1028414 17.99.2673884 13.068.356517 26.245 1.124405 39.169 3.448615 13.109 2.3585 25.306 6.20478 37.222 12.26556 11.703 5.958 22.419 13.7465 31.709 23.0297 9.29 9.29 17.072 19.9992 23.03 31.7094 6.061 11.9091 9.907 24.1129 12.266 37.2222 2.324 12.923 3.092 26.101 3.448 39.169.165 5.999.233 11.991.268 17.99.048 7.123.041 14.24.041 21.364v139z"
        fill="#14120b"
      />
      <path
        d="m415.035 156.35-151.503-87.4695c-4.865-2.8094-10.868-2.8094-15.733 0l-151.4969 87.4695c-4.0897 2.362-6.6146 6.729-6.6146 11.459v176.383c0 4.73 2.5249 9.097 6.6146 11.458l151.5039 87.47c4.865 2.809 10.868 2.809 15.733 0l151.504-87.47c4.089-2.361 6.614-6.728 6.614-11.458v-176.383c0-4.73-2.525-9.097-6.614-11.459zm-9.516 18.528-146.255 253.32c-.988 1.707-3.599 1.01-3.599-.967v-165.872c0-3.314-1.771-6.379-4.644-8.044l-143.645-82.932c-1.707-.988-1.01-3.599.968-3.599h292.509c4.154 0 6.75 4.503 4.673 8.101h-.007z"
        fill="#edecec"
      />
    </svg>
  );
}

function V0Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 20"
      fill="currentColor"
      className="demo-action-btn-v0-icon"
    >
      <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" />
      <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" />
    </svg>
  );
}

const INSTALL_CODE = `# Core package
npm install prompt-input

# Peer dependencies (if not already installed)
npm install framer-motion @radix-ui/react-dropdown-menu @radix-ui/react-select lucide-react`;

const REACT_CODE = `import { useState } from "react";
import { AIPromptInput } from "prompt-input";
import type { PromptData } from "prompt-input";

function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user"; text: string }[]>([]);

  const handleSubmit = (data: PromptData) => {
    setMessages((prev) => [...prev, { role: "user", text: data.text }]);
    // Component resets input automatically; send to your API here
  };

  return (
    <div>
      {messages.map((m, i) => (
        <div key={i}>{m.text}</div>
      ))}
      <AIPromptInput
        onSubmit={handleSubmit}
        placeholder="What would you like to do?"
      />
    </div>
  );
}`;

const TAILWIND_CODE = `// tailwind.config.js – add the package to content
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/prompt-input/dist/**/*.js",
  ],
  // ...
};`;

export default function Home() {
  const handleDefaultSubmit = useCallback((_data: PromptData) => {
    // Demo: only reset input (component clears automatically); do not show in chat
  }, []);

  const handleDarkSubmit = useCallback((_data: PromptData) => {
    // Demo: only reset input (component clears automatically); do not show in chat
  }, []);

  return (
    <div className="page">
      <DemoErrorBoundary>
        <PageHeader />

        <section>
          <h2>Default</h2>
          <p>
            The component includes a textarea, agent selector, sources menu, file
            attach, voice input, and research model selector. Submit with the send
            button or Cmd/Ctrl+Enter; the prompt is passed to{" "}
            <code>onSubmit</code> and you can display it in your chat.
          </p>
          <div className="demo-box-breakout">
            <div className="demo-box">
              <div className="demo-box-inner">
                <AIPromptInput onSubmit={handleDefaultSubmit} />
              </div>
              <div className="demo-box-footer">
                <div className="demo-box-actions">
                  <a
                    href={NPM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-action-btn"
                    title="View prompt-input on npm (new tab)"
                    aria-label="View prompt-input on npm (opens in new tab)"
                  >
                    <NpmIcon />
                    View on npm
                  </a>
                </div>
                <div className="demo-box-actions">
                  <a
                    href={CURSOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-action-btn"
                    title={CURSOR_LINK_TITLE}
                    aria-label={CURSOR_LINK_TITLE}
                  >
                    <CursorIcon />
                    Open in Cursor
                  </a>
                  <a
                    href={V0_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-action-btn"
                    title={V0_LINK_TITLE}
                    aria-label={V0_LINK_TITLE}
                  >
                    <V0Icon />
                    Open in v0
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Dark theme</h2>
          <p>
            Customize colors with CSS custom properties for dark mode or any
            theme.
          </p>
          <div className="demo-box-breakout">
            <div className="demo-dark-bg">
              <div className="demo-dark-inner">
                <AIPromptInput onSubmit={handleDarkSubmit} theme="dark" />
              </div>
              <p className="demo-dark-caption">
                Border, hover, and icon colors can be customized
                <br />
                via CSS variables for seamless theme integration.
              </p>
            </div>
          </div>
        </section>

        <section className="usage-section">
          <h2>How to use in your project</h2>
          <p className="usage-intro">
            Install the package and add the component to your React app. Requires
            Tailwind CSS and the peer dependencies listed below.
          </p>

          <div className="usage-subsection">
            <h2>Installation</h2>
            <p>
              Install the package and peer dependencies. Ensure Tailwind CSS is
              configured and the package is included in your Tailwind content path.
            </p>
            <CodeBlock lang="Bash" filename="terminal" code={INSTALL_CODE} />
          </div>

          <div className="usage-subsection">
            <h2>React</h2>
            <p>
              Import the component and use it like any other React component.
              Styles are included automatically.
            </p>
            <CodeBlock lang="React" filename="chat-page.tsx" code={REACT_CODE} />
          </div>

          <div className="usage-subsection">
            <h2>Tailwind CSS</h2>
            <p>
              Add the package to your Tailwind content array so its classes are
              included in the build.
            </p>
            <CodeBlock
              lang="JavaScript"
              filename="tailwind.config.js"
              code={TAILWIND_CODE}
            />
          </div>
        </section>
      </DemoErrorBoundary>

      <PageFooter />
    </div>
  );
}
