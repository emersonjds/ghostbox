import { api } from "./api";
import type { Identity } from "@/types/entities/identity";

export class IdentityService {
  static async generate(): Promise<Identity> {
    const { data } = await api.post<Identity>("/generate");
    return data;
  }
}
