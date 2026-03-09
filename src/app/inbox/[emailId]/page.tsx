"use client";

import { use } from "react";
import { useInboxPolling } from "@/hooks/use-inbox-polling";
import { IdentityCard } from "@/components/identity-card";
import { InboxList } from "@/components/inbox-list";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Inbox } from "lucide-react";

export default function InboxPage({
  params,
}: {
  params: Promise<{ emailId: string }>;
}) {
  const { emailId } = use(params);
  const { identity, messages, loading, error } = useInboxPolling(emailId);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (loading || !identity) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Skeleton className="h-44 w-full rounded-xl" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <IdentityCard
        emailAddress={identity.emailAddress}
        phoneNumber={identity.phoneNumber}
        expiresAt={identity.expiresAt}
      />
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Inbox className="h-5 w-5 text-emerald-500" />
          Caixa de Entrada
          {messages.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-bold text-white">
              {messages.length}
            </span>
          )}
        </h2>
        <InboxList messages={messages} loading={false} />
      </div>
    </div>
  );
}
