export type AgentType = "task" | "agent";

export interface AgentOption {
  id: AgentType;
  label: string;
}

export type ResearchModelType = "deep-research" | "fast" | "standard";

export interface ResearchModelOption {
  id: ResearchModelType;
  label: string;
}

export interface PromptData {
  text: string;
  agent: AgentType;
  sourcesEnabled: boolean;
  connectorSources: string[];
  researchModel: ResearchModelType;
  attachedFiles: File[];
}

export const DEFAULT_RESEARCH_MODELS: ResearchModelOption[] = [
  { id: "deep-research", label: "Deep Research" },
  { id: "fast", label: "Fast" },
  { id: "standard", label: "Standard" },
];

export type PromptTheme = "light" | "dark";

export interface PromptInputProps {
  onSubmit: (data: PromptData) => void | Promise<void>;
  onVoiceRecord?: (audio: Blob) => void;
  onFileAttach?: (files: File[]) => void;
  onFileRejected?: (rejected: File[]) => void;
  placeholder?: string;
  maxLength?: number;
  maxFileSize?: number;
  agents?: AgentOption[];
  researchModels?: ResearchModelOption[];
  connectorSources?: ConnectorSource[];
  className?: string;
  disabled?: boolean;
  theme?: PromptTheme;
}

export const DEFAULT_AGENTS: AgentOption[] = [
  { id: "agent", label: "Agent" },
  { id: "task", label: "Task" },
];

export interface ConnectorSource {
  id: string;
  label: string;
}

export const DEFAULT_CONNECTOR_SOURCES: ConnectorSource[] = [
  { id: "social-media", label: "Social media" },
  { id: "academic", label: "Academic" },
];
