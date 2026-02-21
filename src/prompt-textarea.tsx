"use client";

import { useCallback, useRef, useEffect } from "react";
import type { PromptTheme } from "./types";

const MIN_HEIGHT = 24;
const MAX_HEIGHT = 200;

const SINGLE_LINE_HEIGHT_THRESHOLD = 40;

interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSingleLineChange?: (isSingleLine: boolean) => void;
  className?: string;
  theme?: PromptTheme;
}

export function PromptTextarea({
  value,
  onChange,
  onSubmit,
  placeholder = "What would you like to do?",
  maxLength,
  disabled = false,
  onFocus,
  onBlur,
  onSingleLineChange,
  className = "",
  theme = "light",
}: PromptTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_HEIGHT),
      MAX_HEIGHT
    );
    textarea.style.height = `${newHeight}px`;
    onSingleLineChange?.(newHeight <= SINGLE_LINE_HEIGHT_THRESHOLD);
  }, [onSingleLineChange]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={`relative flex min-h-0 flex-1 flex-col justify-start ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        rows={1}
        className={`w-full resize-none overflow-y-auto rounded-none border-0 bg-transparent px-0 py-0.5 align-middle font-sans text-base font-normal leading-5 tracking-[-0.02em] focus:outline-none focus:ring-0 cursor-text disabled:cursor-not-allowed disabled:opacity-50 ${
          theme === "dark"
            ? "text-[#F4F4F5] placeholder:text-[#8E8E93] caret-[#F4F4F5]"
            : "text-[#17181A] placeholder:text-[#BBBBBB] caret-[#17181A]"
        }`}
        style={{
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          transition: "height 200ms ease",
        }}
        aria-label="Prompt input"
      />
    </div>
  );
}
