import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FakeRegister - Email & Telefone Temporarios",
  description: "Gere email e telefone temporarios para testar servicos sem expor dados reais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-background to-background/95`}
      >
        <Providers>
          <Header />
          <main className="container mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
