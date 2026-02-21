"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { DeepResearchIcon, AgentChevronDown } from "./icons";
import { TOOLBAR_TEXT_BASE, SELECT_CONTENT_DARK } from "./dropdown-styles";
import type { ResearchModelType, ResearchModelOption, PromptTheme } from "./types";

interface ModelSelectorProps {
  models: ResearchModelOption[];
  selected: ResearchModelType;
  onSelect: (model: ResearchModelType) => void;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onTriggerPointerDown?: () => void;
  showDownIcon?: boolean;
  theme?: PromptTheme;
}

export function ModelSelector({
  models,
  selected,
  onSelect,
  disabled = false,
  onOpenChange,
  onTriggerPointerDown,
  showDownIcon = false,
  theme = "light",
}: ModelSelectorProps) {
  const isDeepResearch = selected === "deep-research";
  const validIds = models.map((m) => m.id);
  const handleValueChange = (value: string) => {
    if (validIds.includes(value as ResearchModelType)) onSelect(value as ResearchModelType);
  };

  return (
    <Select
      value={selected}
      onValueChange={handleValueChange}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        asChild
        className={`group inline-flex h-4 w-auto min-w-0 items-center gap-1.5 border-0 bg-transparent p-0 shadow-none transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDCB59] focus-visible:ring-offset-1 ${theme === "dark" ? "focus-visible:ring-offset-[#1C1C1E]" : ""} data-[state=open]:!ring-0 data-[state=open]:!ring-offset-0 data-[state=open]:!outline-none disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label="Select research model"
      >
        <button
          type="button"
          className={`inline-flex h-4 items-center gap-1.5 ${TOOLBAR_TEXT_BASE} group-data-[state=open]:outline-none group-data-[state=open]:ring-0 group-data-[state=open]:ring-offset-0`}
          aria-haspopup="listbox"
          onPointerDown={onTriggerPointerDown}
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-[14px] [&>svg]:w-[14px] ${
              isDeepResearch ? "text-[#FDCB59]" : theme === "dark" ? "text-[#9CA3AF]" : "text-[#AAAAAA]"
            }`}
          >
            <DeepResearchIcon />
          </span>
          <span
            className="hidden md:inline"
            style={{
              color:
                theme === "dark" && isDeepResearch
                  ? "#ddd"
                  : isDeepResearch
                    ? "#777"
                    : theme === "dark"
                      ? "#9CA3AF"
                      : "#AAAAAA",
            }}
          >
            <SelectValue
              placeholder="Deep Research"
              className="!text-sm !font-normal !leading-4 !tracking-[-0.56px]"
            />
          </span>
          <span
            className={`inline-flex h-2.5 shrink-0 items-center justify-center overflow-hidden transition-all duration-150 group-hover/main:w-2.5 group-hover/main:min-w-2.5 group-hover/main:opacity-100 group-data-[state=open]:w-2.5 group-data-[state=open]:min-w-2.5 group-data-[state=open]:opacity-100 ${
              showDownIcon
                ? "w-2.5 min-w-2.5 opacity-100"
                : "w-0 min-w-0 opacity-0"
            }`}
          >
            <AgentChevronDown className={`h-2.5 w-2.5 shrink-0 aspect-square ${theme === "dark" ? "text-[#9CA3AF]" : "text-[#AAAAAA]"}`} />
          </span>
        </button>
      </SelectTrigger>
      <SelectContent
        align="end"
        alignOffset={-4}
        className={`min-w-[180px] ${theme === "dark" ? SELECT_CONTENT_DARK : ""}`}
      >
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
