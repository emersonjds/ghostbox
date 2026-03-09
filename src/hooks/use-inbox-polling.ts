"use client";

import { useQuery } from "@tanstack/react-query";
import { InboxService } from "@/services/inbox-service";
import type { Identity } from "@/types/entities/identity";
import type { EmailMsg } from "@/types/entities/email-message";

const POLLING_INTERVAL_MS = 5000;

interface InboxData {
  identity: Identity | null;
  messages: EmailMsg[];
  loading: boolean;
  error: string | null;
}

export function useInboxPolling(emailId: string): InboxData {
  const { data, isLoading, error } = useQuery({
    queryKey: ["inbox", emailId],
    queryFn: () => InboxService.getInbox(emailId),
    refetchInterval: POLLING_INTERVAL_MS,
    retry: false,
  });

  return {
    identity: data?.identity ?? null,
    messages: data?.messages ?? [],
    loading: isLoading,
    error: error ? "Identidade nao encontrada ou expirada." : null,
  };
}
