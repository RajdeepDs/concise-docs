"use client";

import { AlertCircleIcon, PaperclipIcon, XIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@concise-docs/ui/components/alert-dialog";
import { Button } from "@concise-docs/ui/components/button";
import { toast } from "@concise-docs/ui/components/sonner";
import { useFileUpload } from "@concise-docs/ui/hooks/use-file-upload";
import { type ReactNode, useEffect, useState } from "react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  children: ReactNode;
}

export function FileUpload({ onFileSelected, children }: FileUploadProps) {
  const maxSize = 5 * 1024 * 1024;
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    maxSize,
    accept: ".pdf,.txt",
  });

  const file = files[0];

  useEffect(() => {
    if (file?.file instanceof File) {
      onFileSelected(file.file);
    }
  }, [file, onFileSelected]);

  useEffect(() => {
    if (errors.length > 0) {
      for (const error of errors) {
        console.error("File upload error:", error);
        if (error.includes("exceeds the maximum size")) {
          toast.error("File size exceeds 5MB limit");
        } else if (error.includes("not an accepted file type")) {
          toast.error("Only PDF and TXT files are supported");
        } else {
          toast.error(error);
        }
      }
    }
  }, [errors]);

  const handleUploadClick = () => {
    setShowPermissionDialog(true);
  };

  return (
    <div className="flex w-full items-center gap-2 overflow-hidden">
      {showPermissionDialog && (
        <AlertDialog
          open={showPermissionDialog}
          onOpenChange={setShowPermissionDialog}
        >
          <AlertDialogContent className="bg-white/70">
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <AlertCircleIcon className="opacity-80" size={16} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-indigo-950">
                  Permission Required
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base text-indigo-950">
                  ConciseDocs needs permission to access your files to upload
                  documents. Do you want to allow access?
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Deny</AlertDialogCancel>
              <AlertDialogAction
                className="bg-indigo-900 hover:bg-indigo-700"
                onClick={() => openFileDialog()}
              >
                Allow Access
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {!file && (
        <div>
          <div
            onClick={handleUploadClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-dragging={isDragging || undefined}
            className="flex min-h-0 w-fit flex-1 items-center gap-6 rounded-xl bg-transparent transition-colors has-disabled:pointer-events-none has-[input:focus]:border-ring has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
          >
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload file"
              disabled={Boolean(file)}
            />
            {children}
            <p className="cursor-default text-indigo-950 text-xl">
              Upload a file (PDF or TXT)...
            </p>
          </div>
          {errors.length > 0 && (
            <div className="mt-2 space-y-1">
              {errors.map((error) => (
                <div
                  key={error}
                  className="flex items-center gap-2 text-base text-red-800"
                >
                  <AlertCircleIcon className="size-4" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex h-15 w-fit items-center justify-between gap-2 rounded-md border bg-background px-6"
          >
            <div className="flex items-center gap-3 overflow-hidden text-indigo-950">
              <PaperclipIcon className="size-4 opacity-60" />
              <div className="min-w-0">
                <p className="truncate text-lg">{file.file.name}</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="-me-2 size-7 text-muted-foreground/80"
              onClick={() => removeFile(file.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
