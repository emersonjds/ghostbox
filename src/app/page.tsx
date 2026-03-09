import { GenerateIdentity } from "@/components/generate-identity";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          FakeRegister
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Gere um email e telefone temporarios para testar servicos sem expor seus dados reais.
          Sem login, sem cadastro.
        </p>
      </div>
      <GenerateIdentity />
      <div className="text-sm text-muted-foreground text-center max-w-sm">
        <p>Sua identidade expira automaticamente em 24 horas.</p>
        <p>Emails recebidos aparecem em tempo real na caixa de entrada.</p>
      </div>
    </div>
  );
}
