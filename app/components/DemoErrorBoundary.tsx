"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class DemoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200"
            role="alert"
          >
            <p className="font-medium">Something went wrong.</p>
            <p className="mt-1 text-sm opacity-90">
              The demo failed to load. Refresh the page or try again later.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
