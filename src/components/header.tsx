import Link from "next/link";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Shield className="h-6 w-6 text-emerald-500" />
          <span className="text-xl font-bold tracking-tight">
            Fake<span className="text-emerald-500">Register</span>
          </span>
        </Link>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Identidade temporaria para testes
        </p>
      </div>
    </header>
  );
}
