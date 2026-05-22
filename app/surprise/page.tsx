import type { Metadata } from "next";
import SurpriseScreen from "@/components/SurpriseScreen";

export const metadata: Metadata = {
  title: "Happy Birthday My Bubi ❤️",
  description: "Your surprise. Love letter inside.",
};

export default function SurprisePage() {
  return <SurpriseScreen />;
}
