"use client";

import { create } from "zustand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  resolve: ((value: boolean) => void) | null;
}

interface ConfirmDialogStore extends ConfirmDialogState {
  setOpen: (open: boolean) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  open: false,
  title: "Are you sure?",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  resolve: null,
  setOpen: (open) => set({ open }),
  confirm: (options) => {
    return new Promise<boolean>((resolve) => {
      set({
        open: true,
        title: options.title || "Are you sure?",
        description: options.description || "",
        confirmText: options.confirmText || "Confirm",
        cancelText: options.cancelText || "Cancel",
        resolve,
      });
    });
  },
}));

export function ConfirmDialog() {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    resolve,
    setOpen,
  } = useConfirmDialogStore();

  const handleConfirm = () => {
    resolve?.(true);
    setOpen(false);
  };

  const handleCancel = () => {
    resolve?.(false);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const useConfirm = () => {
  const confirm = useConfirmDialogStore((state) => state.confirm);
  return confirm;
};
