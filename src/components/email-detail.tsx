"use client";

import DOMPurify from "dompurify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";

interface EmailDetailProps {
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml: string;
  receivedAt: string;
}

export function EmailDetail({ from, subject, bodyPlain, bodyHtml, receivedAt }: EmailDetailProps) {
  const sanitizedHtml = bodyHtml ? DOMPurify.sanitize(bodyHtml) : "";

  return (
    <Card className="border-border/50">
      <CardHeader className="space-y-3 pb-4">
        <CardTitle className="text-lg">{subject}</CardTitle>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {from}
          </span>
          <Badge variant="outline" className="gap-1 text-xs font-normal">
            <Calendar className="h-3 w-3" />
            {new Date(receivedAt).toLocaleString("pt-BR")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          {sanitizedHtml ? (
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          ) : (
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{bodyPlain}</pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
