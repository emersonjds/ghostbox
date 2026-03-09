export interface EmailMsg {
  id: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml: string;
  receivedAt: string;
}
