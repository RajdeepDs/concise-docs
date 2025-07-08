"use client";

import { Button } from "@concise-docs/ui/components/button";
import { AboutDialog } from "./about-dialog";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between text-white">
      <h1 className="select-none font-semibold text-4xl">ConciseDocs</h1>
      <div className="flex items-center gap-3">
        <Button
          variant={"ghost"}
          className="cursor-pointer px-3 font-normal text-lg text-white hover:bg-transparent hover:text-white"
          onClick={() => window.location.reload()}
        >
          Home
        </Button>
        <AboutDialog>
          <Button
            variant={"ghost"}
            className="cursor-pointer px-3 font-normal text-lg text-white hover:bg-transparent hover:text-white"
          >
            About
          </Button>
        </AboutDialog>
      </div>
    </header>
  );
}
