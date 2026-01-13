// components/ui/dialog.jsx

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// Updated DialogContent with responsive positioning
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "z-50 grid w-full max-w-lg p-6 shadow-lg duration-200 sm:rounded-lg border border-neutral-200 bg-white " +
              "fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 " +
              "data-[state=open]:animate-in data-[state=closed]:animate-out " +
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 " +
              "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 " +
              "sm:max-w-[580px] overflow-y-auto " +
              "max-sm:w-[95%] max-sm:p-4 max-sm:rounded-md " +
              "max-sm:top-10 max-sm:translate-y-0",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-1 sm:right-4 top-1 sm:top-4 rounded-sm opacity-70 ring-0 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0">
            <X className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
