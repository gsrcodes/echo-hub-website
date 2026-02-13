"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

const tabs = [
  {
    id: "agenda",
    label: "Agenda",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Sua agenda organizada, seus horários protegidos",
    description:
      "Visualize tudo num calendário bonito e funcional. Cada profissional com sua agenda, cores personalizadas e tudo sincronizado.",
    prints: [
      { src: "/prints/agenda/azul.png", alt: "Visão geral da agenda" },
    ],
  },
  {
    id: "agendamento",
    label: "Agendamento",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Agendamento pelo celular — fácil pro seu cliente",
    description:
      "Seu cliente entra na página, escolhe o dia, o horário e pronto. Sem baixar app, sem complicação. Funciona no celular de qualquer um.",
    prints: [
      { src: "/prints/agendamento/dias.png", alt: "Seleção de dias" },
      { src: "/prints/agendamento/horarios.png", alt: "Seleção de horários" },
    ],
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Todas as conversas do WhatsApp no painel",
    description:
      "Veja todas as conversas em um só lugar. Responda rápido, acompanhe o histórico e nunca mais perca uma mensagem importante.",
    prints: [
      { src: "/prints/conversas/painel_conversas.png", alt: "Painel de conversas" },
      { src: "/prints/conversas/conversa_aberta.png", alt: "Conversa aberta" },
    ],
  },
  {
    id: "agentes",
    label: "Agentes IA",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Agentes IA prontos pra trabalhar",
    description:
      "Monte seus agentes, configure o que eles fazem e pronto. Eles atendem, agendam e respondem — como funcionários que nunca dormem.",
    prints: [
      { src: "/prints/agentes/image.png", alt: "Agentes ativos" },
      { src: "/prints/agentes/biblioteca.png", alt: "Biblioteca de agentes" },
    ],
  },
  {
    id: "uni",
    label: "Uni",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Uni — sua assistente inteligente",
    description:
      "Precisa de ajuda? A Uni tá ali. Ela entende seu negócio e te ajuda a tomar decisões, gerar relatórios e muito mais.",
    prints: [
      { src: "/prints/bi/uni.png", alt: "Uni assistente inteligente" },
    ],
  },
];

export default function Tour() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const current = tabs[activeTab];

  return (
    <section className="section-padding" id="tour">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/5 text-accent text-sm font-medium mb-4">
            Tour pelo sistema
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Veja por dentro da{" "}
            <span className="gradient-text">Unexly</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            De agenda a agentes IA, tudo pensado pra ser simples e bonito.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === i
                  ? "bg-foreground text-white shadow-lg"
                  : "bg-white text-muted border border-border hover:border-foreground/20"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Text side */}
              <div className="order-2 lg:order-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl sm:text-3xl font-bold mb-4"
                >
                  {current.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted text-lg leading-relaxed"
                >
                  {current.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 flex items-center gap-2 text-sm text-muted"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Funciona no computador e no celular
                </motion.div>
              </div>

              {/* Prints side */}
              <div className="order-1 lg:order-2">
                <div
                  className={`grid gap-4 ${
                    current.prints.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {current.prints.map((print, j) => (
                    <motion.div
                      key={print.src}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: j * 0.15 }}
                      className={`rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow ${
                        current.prints.length === 1 ? "max-w-md mx-auto" : ""
                      }`}
                    >
                      <Image
                        src={print.src}
                        alt={print.alt}
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[480px] object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
