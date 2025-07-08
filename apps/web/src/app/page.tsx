"use client";

import { Greetings } from "@/components/greetings";
import { InputBox } from "@/components/input-box";
import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const subGreeting = `Here's a summary of ${fileName}.`;
  return (
    <main className="flex w-full flex-col justify-between overflow-hidden">
      {fileName ? (
        <Greetings subGreet={fileName && subGreeting} />
      ) : (
        <Greetings />
      )}
      <InputBox onFileSelect={setFileName} />
    </main>
  );
}
