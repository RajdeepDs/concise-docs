import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@concise-docs/ui/components/dialog";
import type { ReactNode } from "react";

interface AboutDialogProps {
  children: ReactNode;
}

export function AboutDialog({ children }: AboutDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white/70">
        <DialogTitle className="sr-only">About</DialogTitle>
        <DialogDescription className="sr-only">
          An description about ConciseDocs.
        </DialogDescription>

        <div className="flex flex-col items-start justify-center gap-4 text-center">
          <h1 className="w-full text-center font-semibold text-indigo-950 text-xl">
            About ConciseDocs
          </h1>
          <p className="text-indigo-950 text-lg">
            ConciseDocs is a document summarization tool that enables users to
            upload documents (PDFs and text files) and generate concise,
            informative summaries. The application also provides the ability to
            export summaries as PDF files.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
