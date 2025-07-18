"use client";

import { Button } from "@concise-docs/ui/components/button";
import { toast } from "@concise-docs/ui/components/sonner";
import { Icons } from "@concise-docs/ui/lib/icons";
import { Loader2Icon } from "lucide-react";
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
        toast.error("Failed to export PDF");
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
      toast.error("Error exporting to PDF.");
      alert("Failed to export PDF. Please try again later.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || !summary.trim() || exporting}
      className="flex h-10 cursor-pointer items-center gap-2 bg-indigo-800 text-lg shadow-none hover:bg-indigo-700"
    >
      {exporting ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <Icons.download />
      )}
      {exporting ? "Exporting..." : "Export as PDF"}
    </Button>
  );
}
