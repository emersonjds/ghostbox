import type { Identity } from "@/types/entities/identity";
import type { EmailMsg } from "@/types/entities/email-message";

export interface InboxResponse {
  identity: Identity;
  messages: EmailMsg[];
}
