"use client";

import { use } from "react";
import { useInboxPolling } from "@/hooks/use-inbox-polling";
import { IdentityCard } from "@/components/identity-card";
import { InboxList } from "@/components/inbox-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function InboxPage({
  params,
}: {
  params: Promise<{ emailId: string }>;
}) {
  const { emailId } = use(params);
  const { identity, messages, loading, error } = useInboxPolling(emailId);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (loading || !identity) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <IdentityCard
        emailAddress={identity.emailAddress}
        phoneNumber={identity.phoneNumber}
        expiresAt={identity.expiresAt}
      />
      <div>
        <h2 className="text-lg font-semibold mb-3">Caixa de Entrada</h2>
        <InboxList messages={messages} loading={false} />
      </div>
    </div>
  );
}
