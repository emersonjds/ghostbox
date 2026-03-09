"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IdentityService } from "@/services/identity-service";
import { Sparkles, Loader2 } from "lucide-react";

export function GenerateIdentity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const identity = await IdentityService.generate();
      router.push(`/inbox/${identity.emailId}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleGenerate}
      disabled={loading}
      className="h-14 gap-2 rounded-xl bg-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-500 hover:shadow-emerald-500/40 disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Gerar Identidade Fake
        </>
      )}
    </Button>
  );
}
