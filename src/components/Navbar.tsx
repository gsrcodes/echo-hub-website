"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <Image
              src="/prints/logo/logo_unexly.png"
              alt="Unexly"
              width={36}
              height={36}
              className="w-9 h-9"
              priority
            />
            <span className="text-xl font-bold text-foreground">
              Unex<span className="gradient-text">ly</span>
            </span>
          </button>

          {/* Nav Links - desktop */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Funcionalidades", id: "funcionalidades" },
              { label: "Como funciona", id: "solucao" },
              { label: "Veja por dentro", id: "tour" },
              { label: "Contato", id: "contato" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contato")}
              className="hidden sm:inline-flex text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Fale conosco
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("cta-final")}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow cursor-pointer"
            >
              Testar grátis
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
