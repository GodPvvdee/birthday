import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "How well do you know us? 💕",
  description: "A little quiz before your surprise…",
};

export default function QuizPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16">
      <Quiz />
    </div>
  );
}
