import { Button } from "@concise-docs/ui/components/button";
import { Icons } from "@concise-docs/ui/lib/icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ExportToPdf from "./export-to-pdf";

interface SummarizeBoxProps {
  summary: string;
  timeElapsed: number;
}

export function SummarizeBox({ summary, timeElapsed }: SummarizeBoxProps) {
  const [copied, setCopied] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Optionally handle error
    }
  };

  // Calculate when the animation should finish
  const wordCount = summary.split(" ").length;
  const animationDuration = 0.6 + wordCount * 0.05;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTime(true);
    }, animationDuration * 1000);

    return () => clearTimeout(timer);
  }, [animationDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-white/65 p-4"
    >
      <motion.p
        className="text-2xl text-indigo-950 leading-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {summary.split(" ").map((word, index) => (
          <motion.span
            key={`word-${word.length}-${word.charCodeAt(0)}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.02,
              delay: 0.6 + index * 0.05,
            }}
          >
            {word}
            {index < summary.split(" ").length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.p>
      <AnimatePresence mode="wait">
        {showTime && (
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-gray-700 text-sm">
              📚 Summarized in {timeElapsed.toFixed(1)} seconds.
            </p>
            <div className="flex items-center gap-3">
              <Button
                size={"icon"}
                variant={"secondary"}
                className="size-8 cursor-pointer"
                onClick={handleCopy}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Icons.check />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Icons.copy />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
              <ExportToPdf summary={summary} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
