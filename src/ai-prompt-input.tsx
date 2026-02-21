"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, FileText } from "lucide-react";
import { PromptTextarea } from "./prompt-textarea";
import { AgentSelector } from "./agent-selector";
import { SourcesMenu } from "./sources-menu";
import { AttachButton } from "./attach-button";
import { ModelSelector } from "./model-selector";
import { VoiceInputButton } from "./voice-input-button";
import {
  type PromptInputProps,
  type PromptData,
  type PromptTheme,
  type AgentType,
  type ResearchModelType,
  DEFAULT_AGENTS,
  DEFAULT_RESEARCH_MODELS,
  DEFAULT_CONNECTOR_SOURCES,
} from "./types";

function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce;
}

export function AIPromptInput({
  onSubmit,
  onVoiceRecord,
  onFileAttach,
  placeholder = "What would you like to do?",
  maxLength,
  maxFileSize,
  agents = DEFAULT_AGENTS,
  researchModels = DEFAULT_RESEARCH_MODELS,
  connectorSources: connectorSourcesOptions,
  onFileRejected,
  className = "",
  disabled = false,
  theme = "light",
}: PromptInputProps) {
  const dark = theme === "dark";
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [agent, setAgent] = useState<AgentType>(agents[0]?.id ?? "agent");
  const effectiveAgent: AgentType =
    agents.length > 0 && agents.some((a) => a.id === agent)
      ? agent
      : (agents[0]?.id ?? "agent");
  const [sourcesEnabled, setSourcesEnabled] = useState(false);
  const [connectorSources, setConnectorSources] = useState<string[]>([]);
  const [researchModel, setResearchModel] = useState<ResearchModelType>("deep-research");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpenCount, setDropdownOpenCount] = useState(0);
  const [isSingleLine, setIsSingleLine] = useState(true);
  const scrollYBeforeOpenRef = useRef(0);
  const bodyStylesRef = useRef<{ overflow: string; paddingRight: string } | null>(null);

  const hasContent = text.trim().length > 0 || attachedFiles.length > 0;
  const isToolbarVisible =
    hasContent || isHovered || isFocused || dropdownOpenCount > 0;

  const saveScrollBeforeDropdown = useCallback(() => {
    if (typeof window !== "undefined") {
      scrollYBeforeOpenRef.current = window.scrollY;
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    if (dropdownOpenCount > 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      bodyStylesRef.current = {
        overflow: body.style.overflow,
        paddingRight: body.style.paddingRight,
      };
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      if (bodyStylesRef.current) {
        body.style.overflow = bodyStylesRef.current.overflow;
        body.style.paddingRight = bodyStylesRef.current.paddingRight;
        bodyStylesRef.current = null;
      }
    }
    return () => {
      if (bodyStylesRef.current) {
        body.style.overflow = bodyStylesRef.current.overflow;
        body.style.paddingRight = bodyStylesRef.current.paddingRight;
        bodyStylesRef.current = null;
      }
    };
  }, [dropdownOpenCount]);

  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setDropdownOpenCount((prev) => (open ? prev + 1 : Math.max(0, prev - 1)));
    if (typeof window !== "undefined" && open) {
      const restore = () =>
        window.scrollTo(0, scrollYBeforeOpenRef.current);
      requestAnimationFrame(restore);
      requestAnimationFrame(() => requestAnimationFrame(restore));
      window.setTimeout(restore, 0);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed && attachedFiles.length === 0) return;
    if (disabled || isLoading) return;

    setError(null);
    setIsLoading(true);

    const data: PromptData = {
      text: trimmed,
      agent: effectiveAgent,
      sourcesEnabled,
      connectorSources,
      researchModel,
      attachedFiles,
    };

    try {
      const result = onSubmit(data);
      if (result != null && typeof (result as Promise<unknown>).then === "function") {
        (result as Promise<void>)
          .then(() => {
            setText("");
            setAttachedFiles([]);
          })
          .catch((err: unknown) => {
            setError(err instanceof Error ? err.message : "Something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setText("");
        setAttachedFiles([]);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  }, [
    text,
    effectiveAgent,
    sourcesEnabled,
    connectorSources,
    researchModel,
    attachedFiles,
    disabled,
    isLoading,
    onSubmit,
  ]);

  const handleVoiceToggle = useCallback(() => {
    if (disabled) return;
    setIsRecording((prev) => {
      const next = !prev;
      if (next) {
        // In a real app, would start MediaRecorder and call onVoiceRecord when done
      } else {
        onVoiceRecord?.(new Blob());
      }
      return next;
    });
  }, [disabled, onVoiceRecord]);

  const handlePrimaryAction = useCallback(() => {
    if (isRecording) {
      handleVoiceToggle();
    } else if (text.trim().length > 0 || attachedFiles.length > 0) {
      handleSubmit();
    } else {
      handleVoiceToggle();
    }
  }, [text, attachedFiles, isRecording, handleSubmit, handleVoiceToggle]);

  const handleFileAttach = useCallback(
    (files: File[]) => {
      setAttachedFiles(files);
      onFileAttach?.(files);
    },
    [onFileAttach]
  );

  const handleFileRejected = useCallback(
    (rejected: File[]) => {
      if (rejected.length > 0) {
        setError(
          rejected.length === 1
            ? "File exceeds size limit."
            : "Some files exceed the size limit."
        );
      }
      onFileRejected?.(rejected);
    },
    [onFileRejected]
  );

  return (
    <motion.div
      className={`group/main overflow-hidden transition-colors duration-200 rounded-2xl ${
        error ? "border-2 border-red-500" : ""
      } ${className}`}
      animate={error && !reduceMotion ? { x: [0, -6, 6, -6, 6, 0] } : false}
      transition={error && !reduceMotion ? { duration: 0.4 } : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top section - input area */}
      <div className="px-4 pt-4 pb-0">
        <div
          className={`mx-auto flex min-h-[68px] max-h-[240px] w-full max-w-[640px] flex-col rounded-2xl border pt-[18px] pr-[18px] pb-[18px] pl-6 transition-colors duration-200 ${
            dark
              ? "border-[rgba(255,255,255,0.08)] bg-[#252628]"
              : "border-[#F4F4F4] bg-white"
          }`}
        >
          {attachedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {attachedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className={`flex min-w-0 max-w-full items-center gap-2 rounded-xl border p-1 text-sm transition-colors duration-150 ${
                    dark
                      ? "border-[rgba(255,255,255,0.06)] bg-[#2C2C2E] text-[#F4F4F5]"
                      : "border-[#E8E8E8] bg-[#FAFAFA] text-[#1F1F1F]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                      dark ? "bg-[#3A3A3C] text-[#A1A1AA]" : "bg-[#EEEEEE] text-[#71717A]"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium" title={file.name}>
                    {file.name}
                  </span>
                  {file.size != null && file.size > 0 && (
                    <span
                      className={`shrink-0 text-xs ${
                        dark ? "text-[#9CA3AF]" : "text-[#71717A]"
                      }`}
                    >
                      {file.size < 1024
                        ? `${file.size} B`
                        : file.size < 1024 * 1024
                          ? `${(file.size / 1024).toFixed(1)} KB`
                          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      handleFileAttach(attachedFiles.filter((_, i) => i !== index))
                    }
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-1 ${
                      dark
                        ? "text-[#9CA3AF] hover:bg-[#4A4A4E] hover:text-[#F4F4F5] focus-visible:ring-offset-[#252628]"
                        : "text-[#71717A] hover:bg-[#E5E5E5] hover:text-[#1F1F1F] focus-visible:ring-offset-white"
                    }`}
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div
            className={`flex justify-between gap-4 ${isSingleLine ? "items-center" : "items-start"}`}
          >
            <PromptTextarea
              value={text}
              onChange={setText}
              onSubmit={handleSubmit}
              placeholder={effectiveAgent === "task" ? "Describe a task to automate" : placeholder}
              maxLength={maxLength}
              disabled={disabled || isLoading}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSingleLineChange={setIsSingleLine}
              theme={theme}
            />
            <div className="hidden shrink-0 md:block">
              <VoiceInputButton
                isRecording={isRecording}
                onToggle={handlePrimaryAction}
                disabled={disabled || isLoading}
                hasText={text.trim().length > 0 || attachedFiles.length > 0}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - toolbar */}
      <motion.div
        className="overflow-hidden px-4"
        initial={false}
        animate={{
          height: isToolbarVisible ? 40 : 0,
          opacity: isToolbarVisible ? 1 : 0,
        }}
        transition={
          reduceMotion
            ? { height: { duration: 0 }, opacity: { duration: 0 } }
            : {
                height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2 },
              }
        }
      >
        <div
          className={`mx-auto flex h-[40px] w-full max-w-[608px] flex-wrap items-center justify-between gap-4 border-r border-b border-l px-4 py-3 transition-colors duration-200 ${
            dark
              ? "border-[rgba(255,255,255,0.06)] bg-[#1C1C1E]"
              : "border-[#F6F6F6] bg-[#FBFBFB]"
          }`}
          style={{ borderRadius: "0 0 16px 16px" }}
        >
          <div className="inline-flex items-center gap-4">
            <AgentSelector
              agents={agents}
              selected={effectiveAgent}
              onSelect={setAgent}
              disabled={disabled || isLoading || agents.length === 0}
              onOpenChange={handleDropdownOpenChange}
              onTriggerPointerDown={saveScrollBeforeDropdown}
              showDownIcon={dropdownOpenCount > 0}
              theme={theme}
            />
            <SourcesMenu
              sourcesEnabled={sourcesEnabled}
              onSourcesChange={setSourcesEnabled}
              connectorSources={connectorSources}
              onConnectorSourcesChange={setConnectorSources}
              connectorOptions={connectorSourcesOptions ?? DEFAULT_CONNECTOR_SOURCES}
              disabled={disabled || isLoading}
              onOpenChange={handleDropdownOpenChange}
              onTriggerPointerDown={saveScrollBeforeDropdown}
              showDownIcon={dropdownOpenCount > 0}
              theme={theme}
            />
            <AttachButton
              files={attachedFiles}
              onFilesChange={handleFileAttach}
              onFileRejected={handleFileRejected}
              maxFileSize={maxFileSize}
              disabled={disabled || isLoading}
              theme={theme}
            />
            <div className="md:hidden">
              <VoiceInputButton
                isRecording={isRecording}
                onToggle={handlePrimaryAction}
                disabled={disabled || isLoading}
                hasText={text.trim().length > 0 || attachedFiles.length > 0}
                theme={theme}
              />
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5">
            <ModelSelector
              models={researchModels}
              selected={researchModel}
              onSelect={setResearchModel}
              disabled={disabled || isLoading}
              onOpenChange={handleDropdownOpenChange}
              onTriggerPointerDown={saveScrollBeforeDropdown}
              showDownIcon={dropdownOpenCount > 0}
              theme={theme}
            />
          </div>
        </div>
      </motion.div>

      {(isLoading || error) && (
        <div
          className={`border-t px-4 py-2 transition-colors duration-200 ${
            dark
              ? "border-[rgba(255,255,255,0.06)] bg-[#1C1C1E]"
              : "border-[#F6F6F6] bg-[#FBFBFB]"
          }`}
        >
          {isLoading && (
            <p
              className={`text-sm ${dark ? "text-[#9CA3AF]" : "text-[#525252]"}`}
              role="status"
              aria-live="polite"
            >
              Generating...
            </p>
          )}
          {error && (
            <div className="flex items-center justify-between gap-2">
              <p
                id="prompt-error-message"
                className={`text-sm ${dark ? "text-[#F87171]" : "text-red-500"}`}
                role="alert"
                aria-live="assertive"
              >
                {error.startsWith("Error:") ? error : `Error: ${error}`}
              </p>
              <button
                type="button"
                onClick={() => setError(null)}
                className={`shrink-0 rounded px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${
                  dark
                    ? "text-[#9CA3AF] hover:bg-[#36363A] focus:ring-offset-[#1C1C1E]"
                    : "text-[#525252] hover:bg-[#E5E5E5] focus:ring-offset-white"
                }`}
                aria-label="Dismiss error"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
