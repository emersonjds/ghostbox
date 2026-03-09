import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <Image src="/logo.svg" alt="Ghostbox" width={32} height={32} />
          <span className="text-xl font-bold tracking-tight">
            Ghost<span className="text-emerald-500">box</span>
          </span>
        </Link>
        <p className="hidden text-sm text-muted-foreground sm:block">
          Temporary data that disappears
        </p>
      </div>
    </header>
  );
}
