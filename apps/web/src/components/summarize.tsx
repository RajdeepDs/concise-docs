"use client";

import { useRef, useState } from "react";
import ExportToPdf from "./export-to-pdf";
import FileUpload from "./file-upload";

export function Summarize() {
  const [summary, setSummary] = useState("");
  const [uploading, setUploading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("Document Summary");

  const lastProcessedFileRef = useRef<string | null>(null);

  const handleFileUpload = async (file: File) => {
    if (uploading || lastProcessedFileRef.current === file.name + file.size) {
      return;
    }

    setUploading(true);
    // Store the file identifier to prevent duplicate processing
    lastProcessedFileRef.current = file.name + file.size;

    const formData = new FormData();
    formData.append("file", file);

    // Update document title based on file name
    const fileName = file.name.split(".")[0];
    setDocumentTitle(`${fileName} Summary`);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary || "No summary found.");
      } else {
        console.error("Upload failed");
        setSummary("Failed to summarize the document.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-8">
      <FileUpload onFileSelected={handleFileUpload} />
      <div className="w-full overflow-auto rounded-md border bg-accent p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold text-lg">{documentTitle}</h2>
          <ExportToPdf
            summary={summary}
            documentTitle={documentTitle}
            disabled={uploading || !summary.trim()}
          />
        </div>
        <p className="whitespace-pre-wrap text-sm">
          {uploading
            ? "Summarizing document..."
            : summary || "Summary response will show up here"}
        </p>
      </div>
    </div>
  );
}
