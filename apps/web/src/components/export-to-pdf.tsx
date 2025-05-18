"use client";

import { Button } from "@concise-docs/ui/components/button";
import { File, Loader2Icon } from "lucide-react";
import { useState } from "react";

interface ExportToPdfProps {
  summary: string;
  documentTitle?: string;
  disabled?: boolean;
}

export default function ExportToPdf({
  summary,
  documentTitle = "Document Summary",
  disabled = false,
}: ExportToPdfProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!summary.trim() || exporting) {
      return;
    }

    setExporting(true);

    try {
      // Call the PDF export endpoint
      const response = await fetch("http://localhost:8000/export-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          title: documentTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to export PDF");
      }

      // Get the PDF binary data
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `summary_${new Date().toISOString().substring(0, 19).replace(/:/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      alert("Failed to export PDF. Please try again later.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      size={"sm"}
      onClick={handleExport}
      disabled={disabled || !summary.trim() || exporting}
      className="flex items-center gap-2"
    >
      {exporting ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <File className="h-4 w-4" />
      )}
      {exporting ? "Exporting..." : "Export as PDF"}
    </Button>
  );
}
