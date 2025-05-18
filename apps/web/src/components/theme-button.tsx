"use client";

import { useTheme } from "@concise-docs/ui/providers/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@concise-docs/ui/components/button";

export default function Component() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        variant="outline"
        className="group size-9"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}
