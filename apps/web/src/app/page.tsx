import { Summarize } from "@/components/summarize";
import ThemeButton from "@/components/theme-button";
import { Icons } from "@concise-docs/ui/lib/icons";

export default function Home() {
  return (
    <main className="container mx-auto flex h-screen flex-col py-4">
      <header className="flex items-center justify-between rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <Icons.command />
          <h1 className="font-medium font-mono">Concise Docs</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeButton />
        </div>
      </header>
      <Summarize />
    </main>
  );
}
