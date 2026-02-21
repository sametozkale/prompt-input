"use client";

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";

const Select = SelectPrimitive.Root;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={className} {...props}>
    {children}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SELECT_CONTENT_STYLES =
  "rounded-xl border border-[#F4F4F4] bg-white p-1 shadow-[0_4px_20px_rgba(0,0,0,0.08)] outline-none z-50";

const SELECT_ITEM_STYLES =
  "flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-sm text-[#777] outline-none transition-colors duration-150 hover:bg-[#F5F5F5] focus:bg-[#F5F5F5] data-[highlighted]:bg-[#F5F5F5] data-[highlighted]:text-[#17181A] [&[data-state=checked]]:text-[#17181A]";

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={`min-w-[8rem] ${SELECT_CONTENT_STYLES} ${className ?? ""}`}
      position={position}
      sideOffset={8}
      {...props}
    >
      <SelectPrimitive.Viewport className="flex flex-col gap-0.5">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={`${SELECT_ITEM_STYLES} ${className ?? ""}`}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="ml-auto shrink-0 text-[#17181A]">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
