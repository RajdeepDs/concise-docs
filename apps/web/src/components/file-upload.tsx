"use client";

import {
  AlertCircleIcon,
  PaperclipIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@concise-docs/ui/components/button";
import {
  formatBytes,
  useFileUpload,
} from "@concise-docs/ui/hooks/use-file-upload";
import { useEffect } from "react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

export default function FileUpload({ onFileSelected }: FileUploadProps) {
  const maxSize = 10 * 1024 * 1024;

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
  });

  const file = files[0];

  useEffect(() => {
    if (file) {
      onFileSelected(file.file);
    }
  }, [file?.id, onFileSelected]);

  return (
    <div className="flex w-1/3 flex-col gap-2">
      <div
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
          disabled={Boolean(file)}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 flex size-11 items-center justify-center rounded-full border bg-background">
            <UploadIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 font-medium text-sm">Upload file</p>
          <p className="text-muted-foreground text-xs">
            Drag & drop or click to browse (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3" />
          <span>{errors[0]}</span>
        </div>
      )}

      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon className="size-4 opacity-60" />
              <div className="min-w-0">
                <p className="truncate font-medium text-[13px]">
                  {file.file.name}
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="-me-2 size-8 text-muted-foreground/80"
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
