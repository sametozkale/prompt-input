/**
 * Shared dropdown design tokens - aligned with main AIPromptInput component
 * Border: #F4F4F4 (input), #F6F6F6 (toolbar)
 * Background: white, #FBFBFB (toolbar)
 * Radius: rounded-xl (12px)
 * Hover: #FBFBFB (soft)
 * Focus ring: #3B82F6
 */

export const DROPDOWN_CONTENT =
  "rounded-xl border border-[#F4F4F4] bg-white p-1 shadow-[0_4px_20px_rgba(0,0,0,0.08)] outline-none transition-opacity duration-150";

export const DROPDOWN_CONTENT_DARK =
  "rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#252628] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.4)] outline-none transition-opacity duration-150";

/** Toolbar label text - use with color override (e.g. text-[#585BEF]) */
export const TOOLBAR_TEXT_BASE =
  "font-sans text-sm font-normal leading-4 tracking-[-0.56px]";

/** Toolbar label text with default gray color */
export const TOOLBAR_TEXT = `${TOOLBAR_TEXT_BASE} text-[#AAAAAA]`;

/** Toolbar label text for dark theme (higher contrast for readability) */
export const TOOLBAR_TEXT_DARK = `${TOOLBAR_TEXT_BASE} text-[#9CA3AF]`;

/** Select dropdown content dark theme (use with SelectContent className) */
export const SELECT_CONTENT_DARK =
  "!border-[rgba(255,255,255,0.08)] !bg-[#252628] [&_[data-radix-select-item]]:!text-[#A1A1AA] [&_[data-radix-select-item]]:hover:!bg-[#36363A] [&_[data-radix-select-item]]:data-[highlighted]:!bg-[#36363A] [&_[data-radix-select-item]]:data-[highlighted]:!text-white [&_[data-radix-select-item]]:data-[state=checked]:!text-white [&_[data-radix-select-item][data-state=checked]_*]:!text-white [&_[data-radix-select-item-indicator]]:!text-white";
