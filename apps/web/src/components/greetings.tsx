"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GreetingsProps {
  subGreet?: string;
}
export function Greetings({
  subGreet = "What would you like to summarize today?",
}: GreetingsProps) {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning,👋");
    else if (hour < 18) setGreeting("Good Afternoon,👋");
    else setGreeting("Good Evening,👋");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="mt-10 flex w-full flex-col justify-center gap-2 text-center text-white"
    >
      <h1 className="font-medium text-5xl tracking-wide">{greeting}</h1>
      <p className="font-light text-3xl">{subGreet}</p>
    </motion.div>
  );
}
