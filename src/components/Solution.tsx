"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Conecta o WhatsApp",
    description:
      "Em menos de 2 minutos você conecta seu número. Pronto, suas conversas já aparecem no painel.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: "from-green-400 to-green-600",
  },
  {
    number: "02",
    title: "Configura agenda, serviços e equipe",
    description:
      "Cadastra seus serviços, define horários, adiciona sua equipe. Cada um com seu acesso.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-primary to-blue-600",
  },
  {
    number: "03",
    title: "Agentes IA atendem 24/7",
    description:
      "Seus agentes de IA respondem no WhatsApp, agendam horários e você acompanha tudo no painel — de qualquer lugar.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-accent to-purple-600",
  },
];

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" id="solucao">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
            Simples assim
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            A solução:{" "}
            <span className="gradient-text">Unexly</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Em 3 passos você sai do caos e entra no controle total do seu negócio.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-primary/20 to-accent/20 -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 group">
                  {/* Step number */}
                  <div
                    className={`absolute -top-4 left-8 px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-xs font-bold`}
                  >
                    Passo {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-6 mt-2 group-hover:scale-105 transition-transform`}
                  >
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
