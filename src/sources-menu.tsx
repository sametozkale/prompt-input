"use client";

import type { ComponentType } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Globe, Check, Share2, GraduationCap, FileText } from "lucide-react";
import { AgentChevronDown, SourcesIcon } from "./icons";
import { DROPDOWN_CONTENT, DROPDOWN_CONTENT_DARK, TOOLBAR_TEXT, TOOLBAR_TEXT_DARK } from "./dropdown-styles";
import { DEFAULT_CONNECTOR_SOURCES } from "./types";
import type { ConnectorSource, PromptTheme } from "./types";

const CONNECTOR_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "social-media": Share2,
  academic: GraduationCap,
};

function getConnectorIcon(id: string): ComponentType<{ className?: string }> {
  return CONNECTOR_ICON_MAP[id] ?? FileText;
}

interface SourcesMenuProps {
  sourcesEnabled: boolean;
  onSourcesChange: (enabled: boolean) => void;
  connectorSources: string[];
  onConnectorSourcesChange: (sources: string[]) => void;
  connectorOptions?: ConnectorSource[];
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  onTriggerPointerDown?: () => void;
  showDownIcon?: boolean;
  theme?: PromptTheme;
}

export function SourcesMenu({
  sourcesEnabled,
  onSourcesChange,
  connectorSources,
  onConnectorSourcesChange,
  connectorOptions = DEFAULT_CONNECTOR_SOURCES,
  disabled = false,
  onOpenChange,
  onTriggerPointerDown,
  showDownIcon = false,
  theme = "light",
}: SourcesMenuProps) {
  const dark = theme === "dark";
  const toggleConnector = (id: string) => {
    if (connectorSources.includes(id)) {
      onConnectorSourcesChange(connectorSources.filter((s) => s !== id));
    } else {
      onConnectorSourcesChange([...connectorSources, id]);
    }
  };

  const toggleWeb = () => {
    onSourcesChange(!sourcesEnabled);
  };

  const selectedCount =
    (sourcesEnabled ? 1 : 0) + connectorSources.length;
  const hasSelection = selectedCount > 0;
  const triggerLabel = hasSelection ? `${selectedCount} Sources` : "Sources";
  const triggerTextClass =
    hasSelection
      ? `font-sans text-sm font-normal leading-4 tracking-[-0.56px] ${dark ? "text-[#9CA3AF]" : "text-[#777]"}`
      : dark
        ? TOOLBAR_TEXT_DARK
        : TOOLBAR_TEXT;

  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={`group inline-flex h-4 items-center gap-1.5 ${triggerTextClass} transition-colors duration-200 data-[state=open]:text-[#585BEF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-1 ${dark ? "focus-visible:ring-offset-[#1C1C1E]" : ""} data-[state=open]:!ring-0 data-[state=open]:!ring-offset-0 data-[state=open]:!outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            dark ? "hover:text-[#B0B0B8]" : "hover:text-[#979797]"
          }`}
          aria-label="Sources"
          aria-haspopup="menu"
          onPointerDown={onTriggerPointerDown}
        >
          <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center [&>svg]:h-[14px] [&>svg]:w-[14px]">
            <SourcesIcon />
          </span>
          <span className="hidden md:inline">{triggerLabel}</span>
          <span
            className={`inline-flex h-2.5 shrink-0 items-center justify-center overflow-hidden transition-all duration-150 group-hover/main:w-2.5 group-hover/main:min-w-2.5 group-hover/main:opacity-100 group-data-[state=open]:w-2.5 group-data-[state=open]:min-w-2.5 group-data-[state=open]:opacity-100 ${
              showDownIcon
                ? "w-2.5 min-w-2.5 opacity-100"
                : "w-0 min-w-0 opacity-0"
            }`}
          >
            <AgentChevronDown className={`h-2.5 w-2.5 shrink-0 aspect-square ${dark ? "text-[#9CA3AF]" : "text-[#AAAAAA]"}`} />
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`min-w-[220px] ${dark ? DROPDOWN_CONTENT_DARK : DROPDOWN_CONTENT}`}
          sideOffset={8}
          align="start"
          alignOffset={-4}
        >
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={toggleWeb}
              className={`flex w-full items-center gap-1 rounded-lg px-2 py-1 text-left text-sm transition-colors duration-150 ${
                dark ? "hover:bg-[#36363A]" : "hover:bg-[#F5F5F5]"
              } ${sourcesEnabled ? (dark ? "text-white" : "text-[#17181A]") : dark ? "text-[#9CA3AF]" : "text-[#777]"}`}
            >
              <Globe
                className={`h-4 w-4 shrink-0 ${
                  sourcesEnabled ? (dark ? "text-white" : "text-[#17181A]") : dark ? "text-[#9CA3AF]" : "text-[#777]"
                }`}
              />
              <span className="flex-1 font-medium">Web</span>
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
                  sourcesEnabled
                    ? dark
                      ? "border-white bg-white"
                      : "border-[#17181A] bg-[#17181A]"
                    : dark
                      ? "border-[#52525B] bg-[#36363A]"
                      : "border-[#E5E5E5] bg-white"
                }`}
              >
                {sourcesEnabled && (
                  <Check className={`h-2.5 w-2.5 ${dark ? "text-[#17181A]" : "text-white"}`} />
                )}
              </span>
            </button>
            <div className="flex max-h-[200px] flex-col gap-0.5 overflow-y-auto">
              {connectorOptions.map((connector) => {
                const isChecked = connectorSources.includes(connector.id);
                const Icon = getConnectorIcon(connector.id);
                return (
                  <button
                    key={connector.id}
                    type="button"
                    onClick={() => toggleConnector(connector.id)}
                    className={`flex w-full items-center gap-1 rounded-lg px-2 py-1 text-left text-sm transition-colors duration-150 ${
                      dark ? "hover:bg-[#36363A]" : "hover:bg-[#F5F5F5]"
                    } ${isChecked ? (dark ? "text-white" : "text-[#17181A]") : dark ? "text-[#9CA3AF]" : "text-[#777]"}`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        isChecked ? (dark ? "text-white" : "text-[#17181A]") : dark ? "text-[#9CA3AF]" : "text-[#777]"
                      }`}
                    />
                    <span className="flex-1">{connector.label}</span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
                        isChecked
                          ? dark
                            ? "border-white bg-white"
                            : "border-[#17181A] bg-[#17181A]"
                          : dark
                            ? "border-[#52525B] bg-[#36363A]"
                            : "border-[#E5E5E5] bg-white"
                      }`}
                    >
                      {isChecked && (
                        <Check className={`h-2.5 w-2.5 ${dark ? "text-[#17181A]" : "text-white"}`} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
