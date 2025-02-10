"use client";

import { Button } from "@/components/button";
import { HeroSection } from "@/components/hero-section";
import { NavBar } from "@/components/nav-bar";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  return (
    <main>
      <NavBar />
      <HeroSection />
      <Button size="lg" className="bg-black text-white hover:bg-black/80 text-lg px-8 py-6 rounded-full" onClick={() => router.push("/signin")}>
        Login to Try-on!
      </Button>
    </main>
  );
}
