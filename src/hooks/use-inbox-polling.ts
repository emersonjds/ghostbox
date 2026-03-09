"use client";

import { useEffect, useState, useCallback } from "react";
const POLLING_INTERVAL_MS = 5000;

interface EmailMsg {
  id: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml: string;
  receivedAt: string;
}

interface Identity {
  emailId: string;
  emailAddress: string;
  phoneNumber: string;
  createdAt: string;
  expiresAt: string;
}

interface InboxData {
  identity: Identity | null;
  messages: EmailMsg[];
  loading: boolean;
  error: string | null;
}

export function useInboxPolling(emailId: string): InboxData {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [messages, setMessages] = useState<EmailMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInbox = useCallback(async () => {
    try {
      const res = await fetch(`/api/inbox/${emailId}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError("Identidade nao encontrada ou expirada.");
          return;
        }
        throw new Error("Failed to fetch inbox");
      }
      const data = await res.json();
      setIdentity(data.identity);
      setMessages(data.messages);
      setError(null);
    } catch {
      setError("Erro ao carregar inbox.");
    } finally {
      setLoading(false);
    }
  }, [emailId]);

  useEffect(() => {
    fetchInbox();
    const interval = setInterval(fetchInbox, POLLING_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchInbox]);

  return { identity, messages, loading, error };
}
