"use client";

import { motion } from "framer-motion";
import type { PromptTheme } from "./types";

interface VoiceInputButtonProps {
  isRecording: boolean;
  onToggle: () => void;
  disabled?: boolean;
  hasText?: boolean;
  theme?: PromptTheme;
}

const WAVEFORM_BARS = [
  { d: "M6 9.85999V14.15", delay: 0 },
  { d: "M9 8.42999V15.57", delay: 0.15 },
  { d: "M12 7V17", delay: 0.3 },
  { d: "M15 8.42999V15.57", delay: 0.45 },
  { d: "M18 9.85999V14.15", delay: 0.6 },
];

function WaveformIcon({
  animated = false,
  strokeColor = "white",
}: {
  animated?: boolean;
  strokeColor?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {WAVEFORM_BARS.map((bar) =>
        animated ? (
          <motion.path
            key={bar.d}
            d={bar.d}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ scaleY: [1, 1.8, 0.4, 1.5, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay,
            }}
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
        ) : (
          <path
            key={bar.d}
            d={bar.d}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      )}
    </svg>
  );
}

function SendArrowIcon({ strokeColor = "white" }: { strokeColor?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M12.0467 6.37998L8.00004 2.33331L3.95337 6.37998"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.6667V2.44666"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VoiceInputButton({
  isRecording,
  onToggle,
  disabled = false,
  hasText = false,
  theme = "light",
}: VoiceInputButtonProps) {
  const dark = theme === "dark";
  const strokeColor = dark ? "#17181A" : "white";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        dark
          ? "bg-white text-[#17181A] hover:bg-[#E8E8ED] active:bg-[#D1D1D6] focus:ring-offset-[#252628]"
          : "bg-[#17181A] text-white hover:bg-[#2a2b2e] active:bg-[#1a1b1e]"
      }`}
      aria-label={
        isRecording ? "Stop recording" : hasText ? "Send" : "Start voice input"
      }
    >
      {isRecording ? (
        <WaveformIcon animated strokeColor={strokeColor} />
      ) : hasText ? (
        <SendArrowIcon strokeColor={strokeColor} />
      ) : (
        <WaveformIcon strokeColor={strokeColor} />
      )}
    </motion.button>
  );
}
