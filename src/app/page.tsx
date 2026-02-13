"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";
import ColorSwitcher from "@/components/ColorSwitcher";
import Tour from "@/components/Tour";
import AIAgents from "@/components/AIAgents";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <ColorSwitcher />
        <Tour />
        <AIAgents />
        <Features />
        <SocialProof />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
