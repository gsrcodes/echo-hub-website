"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

const colors = [
  {
    name: "Azul",
    key: "azul",
    accent: "#0ea5a8",
    accentLight: "#ccfbf1",
    accentRing: "ring-teal-400",
    bgDot: "bg-teal-500",
    btnBg: "bg-teal-500 hover:bg-teal-600",
    badgeBg: "bg-teal-50 text-teal-600",
    glow: "shadow-teal-200/50",
  },
  {
    name: "Verde",
    key: "verde",
    accent: "#22c55e",
    accentLight: "#dcfce7",
    accentRing: "ring-green-400",
    bgDot: "bg-green-500",
    btnBg: "bg-green-500 hover:bg-green-600",
    badgeBg: "bg-green-50 text-green-600",
    glow: "shadow-green-200/50",
  },
  {
    name: "Vermelho",
    key: "vermelho",
    accent: "#ef4444",
    accentLight: "#fee2e2",
    accentRing: "ring-red-400",
    bgDot: "bg-red-500",
    btnBg: "bg-red-500 hover:bg-red-600",
    badgeBg: "bg-red-50 text-red-600",
    glow: "shadow-red-200/50",
  },
  {
    name: "Rosa",
    key: "rosa",
    accent: "#a855f7",
    accentLight: "#f3e8ff",
    accentRing: "ring-purple-400",
    bgDot: "bg-purple-500",
    btnBg: "bg-purple-500 hover:bg-purple-600",
    badgeBg: "bg-purple-50 text-purple-600",
    glow: "shadow-purple-200/50",
  },
];

export default function ColorSwitcher() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const current = colors[active];

  return (
    <section className="section-padding bg-surface/50" id="cores">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 transition-colors duration-500 ${current.badgeBg}`}
          >
            Personalização total
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            O sistema se adapta à{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: current.accent }}
            >
              sua empresa
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Escolha as cores que combinam com sua marca. Tudo muda na hora,
            sem complicação.
          </p>
        </motion.div>

        {/* Color Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="text-sm text-muted font-medium mr-2">
            Experimente as cores:
          </span>
          {colors.map((color, i) => (
            <motion.button
              key={color.key}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(i)}
              className={`w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                color.bgDot
              } ${
                active === i
                  ? `ring-4 ${color.accentRing} ring-offset-2 scale-110`
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`Cor ${color.name}`}
            />
          ))}
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className={`relative rounded-2xl p-2 sm:p-3 transition-shadow duration-500 shadow-2xl ${current.glow}`}
            style={{
              background: `linear-gradient(135deg, ${current.accent}15, ${current.accent}05)`,
              border: `1px solid ${current.accent}20`,
            }}
          >
            <div className="relative rounded-xl overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src={`/prints/agenda/${current.key}.png`}
                    alt={`Agenda Unexly - tema ${current.name}`}
                    width={1200}
                    height={700}
                    className="w-full h-auto"
                    priority={current.key === "azul"}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Accent decorations */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.div
              layout
              className={`px-4 py-2 rounded-full text-white text-sm font-medium transition-colors duration-500 ${current.btnBg}`}
            >
              Botão primário
            </motion.div>
            <motion.div
              layout
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500 ${current.badgeBg}`}
            >
              Badge exemplo
            </motion.div>
            <motion.div
              layout
              className="w-12 h-1 rounded-full transition-colors duration-500"
              style={{ backgroundColor: current.accent }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
