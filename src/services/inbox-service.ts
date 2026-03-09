import { api } from "./api";
import type { InboxResponse } from "@/types/interfaces/inbox-response";

export class InboxService {
  static async getInbox(emailId: string): Promise<InboxResponse> {
    const { data } = await api.get<InboxResponse>(`/inbox/${emailId}`);
    return data;
  }
}
