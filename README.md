# Prompt Input

A production-ready prompt input component with agent selector, sources toggle, file attach, and deep research mode.

## Installation

```shell
npm install @sametozkale/prompt-input
```

Install peer dependencies if not already in your project:

```shell
npm install framer-motion @radix-ui/react-dropdown-menu @radix-ui/react-select lucide-react
```

Requires [Tailwind CSS](https://tailwindcss.com/). Include the package in your Tailwind content so its classes are generated:

**Tailwind v3** (e.g. `tailwind.config.js`):

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@sametozkale/prompt-input/dist/**/*.js",
  ],
  // ...
};
```

**Tailwind v4** (PostCSS / `@config`): ensure your content sources include the package, for example in your main CSS or config:

```css
@import "tailwindcss";

@source "../node_modules/@sametozkale/prompt-input/dist/**/*.js";
```

Or in `tailwind.config.ts`: set `content` (or the v4 equivalent) to include `"./node_modules/@sametozkale/prompt-input/dist/**/*.js"`.

## Usage

When the user submits (send button, Enter when there is text, or Cmd/Ctrl+Enter), `onSubmit` is called with the full `PromptData`. Use Shift+Enter for a new line. The component then clears the input. Use `onSubmit` to add the prompt to your chat and send it to your API. When **Task** is selected (instead of Agent), the placeholder shows "Describe a task to automate" unless you pass a custom `placeholder`.

```tsx
import { useState } from "react";
import { AIPromptInput } from "@sametozkale/prompt-input";
import type { PromptData } from "@sametozkale/prompt-input";

function ChatPage() {
  const [messages, setMessages] = useState<{ role: "user"; text: string }[]>([]);

  const handleSubmit = (data: PromptData) => {
    setMessages((prev) => [...prev, { role: "user", text: data.text }]);
    // Component clears input automatically; call your API here
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
}
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: PromptData) => void \| Promise<void>` | - | Called when the user submits (Enter with text, Cmd/Ctrl+Enter, or send button). Shift+Enter inserts a new line. May be sync or async; the input is cleared after success. Add `data.text` to your chat in this handler. |
| `onVoiceRecord` | `(audio: Blob) => void` | - | Called when voice recording finishes. **Voice UI only:** the component provides the button and recording state; actual capture (e.g. MediaRecorder) is app-specific—implement it and pass the resulting blob here. |
| `onFileAttach` | `(files: File[]) => void` | - | Called when files are attached or removed |
| `onFileRejected` | `(rejected: File[]) => void` | - | Called when one or more files are rejected (e.g. exceed `maxFileSize`) |
| `placeholder` | `string` | `"What would you like to do?"` | Textarea placeholder. When agent is **Task**, the placeholder is `"Describe a task to automate"` unless overridden. |
| `maxLength` | `number` | - | Max character length |
| `maxFileSize` | `number` | - | Max file size in bytes per file. Files over this limit are rejected and `onFileRejected` is called. |
| `agents` | `AgentOption[]` | `DEFAULT_AGENTS` | Agent options (Agent, Task). If empty, the agent selector is disabled and shows no options. |
| `researchModels` | `ResearchModelOption[]` | `DEFAULT_RESEARCH_MODELS` | Research model options |
| `connectorSources` | `ConnectorSource[]` | `DEFAULT_CONNECTOR_SOURCES` | Source options for the Sources menu |
| `className` | `string` | `""` | Additional CSS class for the root element |
| `disabled` | `boolean` | `false` | Disable the component |
| `theme` | `"light" \| "dark"` | `"light"` | Visual theme for the component |

### PromptData

```ts
interface PromptData {
  text: string;
  agent: "task" | "agent";
  sourcesEnabled: boolean;
  connectorSources: string[];
  researchModel: "deep-research" | "fast" | "standard";
  attachedFiles: File[];
}
```

### Exports

- `AIPromptInput` – Main component
- `DEFAULT_AGENTS`, `DEFAULT_RESEARCH_MODELS`, `DEFAULT_CONNECTOR_SOURCES` – Default option arrays
- Types: `PromptInputProps`, `PromptData`, `PromptTheme`, `AgentType`, `AgentOption`, `ResearchModelType`, `ResearchModelOption`, `ConnectorSource`

## Customization

The component uses Tailwind CSS classes. Override styles by passing a custom `className` or by configuring your Tailwind theme. Colors, borders, and typography can be adjusted to match your design system.

## Links

- [Demo](https://prompt-input.vercel.app/)
- [GitHub](https://github.com/sametozkale/prompt-input)
- [npm](https://www.npmjs.com/package/@sametozkale/prompt-input)

## License

MIT
