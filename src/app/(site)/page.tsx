import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TechMart | Premium Technology Store - Latest Gadgets & Electronics",
  description: "Discover premium technology products, latest gadgets, and electronics at unbeatable prices. Your trusted destination for innovation and quality.",
};

export default async function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}