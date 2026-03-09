"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";
import { CountdownTimer } from "@/components/countdown-timer";
import { Mail, Phone, Timer } from "lucide-react";

interface IdentityCardProps {
  emailAddress: string;
  phoneNumber: string;
  expiresAt: string;
}

export function IdentityCard({ emailAddress, phoneNumber, expiresAt }: IdentityCardProps) {
  return (
    <Card className="border-emerald-500/20 bg-gradient-to-br from-card to-emerald-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Timer className="h-4 w-4 text-emerald-500" />
            </div>
            Sua Identidade
          </span>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 gap-1">
            <CountdownTimer expiresAt={expiresAt} />
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
          <Mail className="h-4 w-4 shrink-0 text-emerald-500" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
            <p className="truncate font-mono text-sm">{emailAddress}</p>
          </div>
          <CopyButton text={emailAddress} />
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
          <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Telefone</p>
            <p className="truncate font-mono text-sm">{phoneNumber}</p>
          </div>
          <CopyButton text={phoneNumber} />
        </div>
      </CardContent>
    </Card>
  );
}
