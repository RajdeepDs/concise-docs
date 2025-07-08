import { Button } from "@concise-docs/ui/components/button";
import { toast } from "@concise-docs/ui/components/sonner";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { FileUpload } from "./add-file";
import { SummarizeBox } from "./summarize-box";

interface InputBoxProps {
  onFileSelect: (fileName: string) => void;
}

export function InputBox({ onFileSelect }: InputBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const lastProcessedFileRef = useRef<string | null>(null);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [summarizationTime, setSummarizationTime] = useState<number>(0);

  const handleFileUpload = async (file: File) => {
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
    onFileSelect(fileNameWithoutExtension);
    if (lastProcessedFileRef.current === file.name + file.size) {
      return;
    }

    setSummarizing(true);
    // Store the file identifier to prevent duplicate processing
    lastProcessedFileRef.current = file.name + file.size;

    const startTime = performance.now();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const endTime = performance.now();
        const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
        setSummary(data.summary);
        setSummarizationTime(timeElapsed);
        toast.success("File summarized successfully");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <div className="flex w-full items-center justify-between rounded-xl bg-white/65 p-4">
        <FileUpload onFileSelected={setFile}>
          <Button
            variant={"secondary"}
            className="h-15 cursor-pointer px-20 text-2xl text-indigo-950"
          >
            Upload file
          </Button>
        </FileUpload>
        <Button
          className="h-15 cursor-pointer bg-indigo-800 text-lg shadow-none hover:bg-indigo-700"
          disabled={!file || summarizing}
          onClick={() => file && handleFileUpload(file)}
        >
          {summarizing ? "Summarizing..." : " ⚡ Summarize"}
        </Button>
      </div>
      {summary && (
        <SummarizeBox summary={summary} timeElapsed={summarizationTime} />
      )}
    </motion.div>
  );
}
