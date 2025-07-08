"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GreetingsProps {
  subGreet?: string;
}
export function Greetings({
  subGreet = "What would you like to summarize today?",
}: GreetingsProps) {
  const [file, setFile] = useState<File | null>(null);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning, 👋");
    else if (hour < 18) setGreeting("Good afternoon, 👋");
    else setGreeting("Good evening, 👋");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="mt-12 flex w-full flex-col justify-center gap-2 text-center text-white"
    >
      <h1 className="font-medium text-4xl tracking-wide">{greeting}</h1>
      <p className="font-light text-2xl">{subGreet}</p>
    </motion.div>
  );
}
