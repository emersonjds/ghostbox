import { GenerateIdentity } from "@/components/generate-identity";
import { Mail, Phone, Clock, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-16 md:py-24">
      <div className="text-center space-y-4">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
          <ShieldCheck className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Identidade <span className="text-emerald-500">temporaria</span>
          <br />em segundos
        </h1>
        <p className="mx-auto max-w-lg text-lg text-muted-foreground">
          Gere um email e telefone falsos para testar servicos sem expor seus dados reais.
          Sem login, sem cadastro, sem complicacao.
        </p>
      </div>

      <GenerateIdentity />

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-6 text-center">
          <Mail className="h-8 w-8 text-emerald-500/80" />
          <h3 className="text-sm font-semibold">Email funcional</h3>
          <p className="text-xs text-muted-foreground">
            Receba emails reais na caixa de entrada
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-6 text-center">
          <Phone className="h-8 w-8 text-emerald-500/80" />
          <h3 className="text-sm font-semibold">Telefone fake</h3>
          <p className="text-xs text-muted-foreground">
            Numero formatado pronto para usar
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/50 p-6 text-center">
          <Clock className="h-8 w-8 text-emerald-500/80" />
          <h3 className="text-sm font-semibold">Expira em 24h</h3>
          <p className="text-xs text-muted-foreground">
            Dados removidos automaticamente
          </p>
        </div>
      </div>
    </div>
  );
}
