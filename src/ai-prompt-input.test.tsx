import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AIPromptInput } from "./ai-prompt-input";

describe("AIPromptInput", () => {
  it("renders with default placeholder", () => {
    render(<AIPromptInput onSubmit={() => {}} />);
    expect(
      screen.getByPlaceholderText("What would you like to do?")
    ).toBeInTheDocument();
  });

  it("calls onSubmit when submit is triggered with text", () => {
    const onSubmit = vi.fn();
    render(<AIPromptInput onSubmit={onSubmit} />);
    const textarea = screen.getByRole("textbox", { name: /prompt input/i });
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "Hello",
        agent: "agent",
        sourcesEnabled: false,
        connectorSources: [],
        researchModel: "deep-research",
        attachedFiles: [],
      })
    );
  });

  it("does not call onSubmit when disabled", () => {
    const onSubmit = vi.fn();
    render(<AIPromptInput onSubmit={onSubmit} disabled />);
    const textarea = screen.getByRole("textbox", { name: /prompt input/i });
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders with theme dark", () => {
    render(<AIPromptInput onSubmit={() => {}} theme="dark" />);
    expect(
      screen.getByPlaceholderText("What would you like to do?")
    ).toBeInTheDocument();
  });

  it("shows task placeholder when Task is selected", () => {
    const agents = [
      { id: "task" as const, label: "Task" },
      { id: "agent" as const, label: "Agent" },
    ];
    render(<AIPromptInput onSubmit={() => {}} agents={agents} />);
    expect(
      screen.getByPlaceholderText("Describe a task to automate")
    ).toBeInTheDocument();
  });

  it("shows task placeholder in dark theme when Task is selected", () => {
    const agents = [
      { id: "task" as const, label: "Task" },
      { id: "agent" as const, label: "Agent" },
    ];
    render(<AIPromptInput onSubmit={() => {}} agents={agents} theme="dark" />);
    expect(
      screen.getByPlaceholderText("Describe a task to automate")
    ).toBeInTheDocument();
  });

  it("includes agent task in submit payload when Task is selected", () => {
    const agents = [
      { id: "task" as const, label: "Task" },
      { id: "agent" as const, label: "Agent" },
    ];
    const onSubmit = vi.fn();
    render(<AIPromptInput onSubmit={onSubmit} agents={agents} />);
    const textarea = screen.getByRole("textbox", { name: /prompt input/i });
    fireEvent.change(textarea, { target: { value: "Automate this" } });
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "Automate this",
        agent: "task",
        researchModel: "deep-research",
        sourcesEnabled: false,
        connectorSources: [],
        attachedFiles: [],
      })
    );
  });
});
