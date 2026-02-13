import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unexly — Agenda, WhatsApp e Agentes IA para seu negócio",
  description:
    "Organize sua agenda, responda clientes no WhatsApp automaticamente e tenha agentes IA atendendo 24/7. Teste grátis por 10 dias.",
  keywords: [
    "agenda online",
    "whatsapp business",
    "agentes ia",
    "agendamento",
    "gestão de negócios",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
