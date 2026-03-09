"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmailDetail } from "@/components/email-detail";
import { Inbox, Mail } from "lucide-react";
import type { EmailMsg } from "@/types/entities/email-message";

interface InboxListProps {
  messages: EmailMsg[];
  loading: boolean;
}

export function InboxList({ messages, loading }: InboxListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Inbox className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Nenhum email recebido</p>
            <p className="text-xs text-muted-foreground">
              Emails enviados para este endereco aparecerão aqui automaticamente
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Verificando a cada 5 segundos...
          </div>
        </CardContent>
      </Card>
    );
  }

  const selected = messages.find((m) => m.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className={`cursor-pointer transition-all hover:bg-accent/50 ${
              selectedId === msg.id
                ? "border-emerald-500/50 bg-emerald-500/5"
                : ""
            }`}
            onClick={() => setSelectedId(selectedId === msg.id ? null : msg.id)}
          >
            <CardContent className="flex items-center gap-3 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <Mail className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{msg.subject}</p>
                <p className="text-xs text-muted-foreground truncate">{msg.from}</p>
              </div>
              <span className="ml-2 text-[11px] text-muted-foreground whitespace-nowrap">
                {new Date(msg.receivedAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      {selected && (
        <EmailDetail
          from={selected.from}
          subject={selected.subject}
          bodyPlain={selected.bodyPlain}
          bodyHtml={selected.bodyHtml}
          receivedAt={selected.receivedAt}
        />
      )}
    </div>
  );
}
