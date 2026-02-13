"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const agents = [
  {
    name: "Recepcionista",
    emoji: "👋",
    color: "from-blue-400 to-blue-600",
    badge: "bg-blue-50 text-blue-600",
    description: "Recebe o cliente, dá boas vindas e direciona pro setor certo.",
    message: "Olá! Seja bem-vindo(a) 🙂 Em que posso ajudar?",
  },
  {
    name: "Vendas",
    emoji: "💰",
    color: "from-green-400 to-green-600",
    badge: "bg-green-50 text-green-600",
    description: "Apresenta serviços, tira dúvidas sobre preços e fecha negócio.",
    message: "Temos promoção essa semana! Quer saber mais? 🎉",
  },
  {
    name: "Suporte",
    emoji: "🛠️",
    color: "from-orange-400 to-orange-600",
    badge: "bg-orange-50 text-orange-600",
    description: "Resolve problemas, responde dúvidas técnicas e acompanha solicitações.",
    message: "Entendi o problema. Vou resolver pra você agora mesmo! ✅",
  },
  {
    name: "Agendamentos",
    emoji: "📅",
    color: "from-purple-400 to-purple-600",
    badge: "bg-purple-50 text-purple-600",
    description: "Agenda, remarca e confirma horários automaticamente pelo WhatsApp.",
    message: "Seu horário tá confirmado: terça, 14h. Te vejo lá! 📋",
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-muted-light"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function AIAgents() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    setShowMessage(false);
    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setShowMessage(true);
    }, 1200);
    return () => clearTimeout(typingTimer);
  }, [activeAgent]);

  const current = agents[activeAgent];

  return (
    <section className="section-padding bg-surface/50" id="agentes-ia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/5 text-accent text-sm font-medium mb-4">
            Inteligência Artificial
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Agentes IA ={" "}
            <span className="gradient-text">funcionários 24/7</span>
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Cada agente é como um funcionário que nunca dorme, nunca falta e
            sempre atende bem. Na palma da sua mão.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Agent cards */}
          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent, i) => (
              <motion.button
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveAgent(i)}
                className={`relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                  activeAgent === i
                    ? "bg-white shadow-xl border-2 border-foreground/10"
                    : "bg-white/50 border border-border hover:bg-white hover:shadow-md"
                }`}
              >
                <div className="text-3xl mb-3">{agent.emoji}</div>
                <h4 className="font-semibold text-foreground text-sm">
                  {agent.name}
                </h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  {agent.description}
                </p>
                {activeAgent === i && (
                  <motion.div
                    layoutId="agent-indicator"
                    className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gradient-to-r ${agent.color}`}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Chat preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden">
              {/* Chat header */}
              <div
                className={`bg-gradient-to-r ${current.color} px-6 py-4 flex items-center gap-3`}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  {current.emoji}
                </div>
                <div className="text-white">
                  <p className="font-semibold text-sm">{current.name}</p>
                  <p className="text-xs text-white/70">
                    Agente IA • Online agora
                  </p>
                </div>
                <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Chat body */}
              <div className="p-6 min-h-[200px] bg-gradient-to-b from-surface/50 to-white">
                {/* User message */}
                <div className="flex justify-end mb-4">
                  <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[70%]">
                    Oi, preciso de ajuda!
                  </div>
                </div>

                {/* Agent response */}
                <div className="flex justify-start">
                  <AnimatePresence mode="wait">
                    {isTyping ? (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white border border-border px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm"
                      >
                        <TypingDots />
                      </motion.div>
                    ) : showMessage ? (
                      <motion.div
                        key="message"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-border px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] shadow-sm"
                      >
                        {current.message}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Chat footer */}
              <div className="px-6 py-3 border-t border-border bg-surface/30 flex items-center gap-3">
                <div className="flex-1 bg-surface rounded-full px-4 py-2 text-sm text-muted">
                  Digite uma mensagem...
                </div>
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-r ${current.color} flex items-center justify-center text-white`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
