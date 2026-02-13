"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "26babe76-46ed-4886-a890-8608325e78c6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="section-padding" id="cta-final">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-slate-800 to-foreground p-10 md:p-16 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Teste grátis por{" "}
                <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
                  10 dias
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                Sem cartão de crédito, sem pegadinha. Monte tudo, teste com seus
                clientes e veja o resultado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 bg-white text-foreground text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                >
                  Começar agora — é grátis
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 border border-white/20 text-white text-lg font-semibold rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Falar com a gente
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-surface/50" id="contato">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
                Fale conosco
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Quer que a gente{" "}
                <span className="gradient-text">configure com você?</span>
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">
                Manda uma mensagem que a gente te responde rapidinho. Pode ser
                dúvida, sugestão ou só pra bater um papo sobre como a Unexly
                pode ajudar seu negócio.
              </p>
              <div className="space-y-4">
                {[
                  "Resposta em até 24 horas",
                  "Ajudamos na configuração inicial",
                  "Sem compromisso, sem pressão",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 border border-border shadow-xl"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Seu nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Ex: Maria Silva"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Seu e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Ex: maria@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Sua mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Conte um pouco sobre seu negócio ou faça sua pergunta..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface/50 text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={status !== "sending" ? { scale: 1.01 } : {}}
                    whileTap={status !== "sending" ? { scale: 0.99 } : {}}
                    className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all cursor-pointer ${
                      status === "sending"
                        ? "bg-muted cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30"
                    }`}
                  >
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar mensagem"
                    )}
                  </motion.button>

                  {/* Status messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-green-50 text-green-700 text-sm"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mensagem enviada com sucesso! Vamos te responder em breve.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Ops, algo deu errado. Tente novamente ou nos chame no WhatsApp.
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
