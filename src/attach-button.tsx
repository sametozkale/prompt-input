"use client";

import { useRef } from "react";
import { AttachIcon } from "./icons";
import { TOOLBAR_TEXT, TOOLBAR_TEXT_DARK } from "./dropdown-styles";
import type { PromptTheme } from "./types";

interface AttachButtonProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onFileRejected?: (rejected: File[]) => void;
  maxFileSize?: number;
  disabled?: boolean;
  theme?: PromptTheme;
}

const ACCEPTED_TYPES = "image/*,.pdf,.doc,.docx,.txt";

export function AttachButton({
  files,
  onFilesChange,
  onFileRejected,
  maxFileSize,
  disabled = false,
  theme = "light",
}: AttachButtonProps) {
  const toolbarText = theme === "dark" ? TOOLBAR_TEXT_DARK : TOOLBAR_TEXT;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (selected.length === 0) return;
    if (maxFileSize != null && maxFileSize > 0) {
      const accepted: File[] = [];
      const rejected: File[] = [];
      for (const file of selected) {
        if (file.size <= maxFileSize) accepted.push(file);
        else rejected.push(file);
      }
      if (accepted.length > 0) onFilesChange([...files, ...accepted]);
      if (rejected.length > 0) onFileRejected?.(rejected);
    } else {
      onFilesChange([...files, ...selected]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`inline-flex h-4 items-center gap-1.5 ${toolbarText} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
          theme === "dark"
            ? "hover:text-[#B0B0B8] focus:ring-offset-[#1C1C1E]"
            : "hover:text-[#979797]"
        }`}
        aria-label="Attach files"
        title="Attach files"
      >
        <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center [&>svg]:h-[14px] [&>svg]:w-[14px]">
          <AttachIcon />
        </span>
        <span className="hidden md:inline">Attach</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
