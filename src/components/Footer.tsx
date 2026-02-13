"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/prints/logo/logo_unexly.png"
                alt="Unexly"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl font-bold text-white">Unexly</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Agenda, WhatsApp e Agentes IA — tudo que seu negócio precisa pra
              crescer.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-2">
            {[
              { label: "Funcionalidades", id: "funcionalidades" },
              { label: "Como funciona", id: "solucao" },
              { label: "Contato", id: "contato" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() =>
                  document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} Unexly. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
