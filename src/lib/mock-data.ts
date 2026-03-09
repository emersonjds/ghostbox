import { FAKE_EMAIL_DOMAIN, IDENTITY_TTL_HOURS } from "./constants";
import { generateFakePhoneBR } from "./generate-phone";

export const USE_MOCK = process.env.USE_MOCK === "true";

interface MockIdentity {
  emailId: string;
  emailAddress: string;
  phoneNumber: string;
  createdAt: string;
  expiresAt: string;
}

interface MockEmail {
  id: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml: string;
  receivedAt: string;
}

const mockStore = new Map<string, { identity: MockIdentity; messages: MockEmail[] }>();

function randomHex(len: number): string {
  const chars = "abcdef0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

const sampleEmails: Omit<MockEmail, "id" | "receivedAt">[] = [
  {
    from: "noreply@github.com",
    subject: "Confirme seu email no GitHub",
    bodyPlain: "Ola! Clique no link abaixo para confirmar seu endereco de email e ativar sua conta GitHub.\n\nLink: https://github.com/confirm/abc123\n\nSe voce nao criou esta conta, ignore este email.",
    bodyHtml: "<div style='font-family: sans-serif; padding: 20px;'><h2>Bem-vindo ao GitHub!</h2><p>Clique no botao abaixo para confirmar seu email:</p><a href='#' style='display:inline-block;padding:12px 24px;background:#238636;color:white;border-radius:6px;text-decoration:none;font-weight:bold;'>Confirmar email</a><p style='color:#666;margin-top:16px;font-size:13px;'>Se voce nao criou esta conta, ignore este email.</p></div>",
  },
  {
    from: "welcome@spotify.com",
    subject: "Bem-vindo ao Spotify! 🎵",
    bodyPlain: "Sua conta foi criada com sucesso!\n\nAproveite milhoes de musicas, podcasts e muito mais.\n\nBaixe o app: https://spotify.com/download",
    bodyHtml: "<div style='font-family: sans-serif; padding: 20px; background: linear-gradient(135deg, #1DB954 0%, #191414 100%); color: white; border-radius: 12px;'><h2 style='margin:0 0 12px;'>🎵 Bem-vindo ao Spotify!</h2><p>Sua conta foi criada com sucesso. Aproveite milhoes de musicas, podcasts e muito mais.</p><a href='#' style='display:inline-block;padding:12px 24px;background:white;color:#191414;border-radius:24px;text-decoration:none;font-weight:bold;margin-top:8px;'>Baixar o App</a></div>",
  },
  {
    from: "security@google.com",
    subject: "Alerta de seguranca: novo login detectado",
    bodyPlain: "Detectamos um novo login na sua conta Google.\n\nDispositivo: Chrome no macOS\nLocal: Sao Paulo, Brasil\nHora: Agora\n\nSe foi voce, nenhuma acao e necessaria. Caso contrario, proteja sua conta imediatamente.",
    bodyHtml: "<div style='font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'><div style='display:flex;align-items:center;gap:8px;margin-bottom:16px;'><span style='font-size:24px;'>🔒</span><h2 style='margin:0;'>Alerta de seguranca</h2></div><p>Detectamos um novo login na sua conta.</p><table style='width:100%;border-collapse:collapse;margin:12px 0;'><tr><td style='padding:8px;border-bottom:1px solid #eee;color:#666;'>Dispositivo</td><td style='padding:8px;border-bottom:1px solid #eee;'>Chrome no macOS</td></tr><tr><td style='padding:8px;border-bottom:1px solid #eee;color:#666;'>Local</td><td style='padding:8px;border-bottom:1px solid #eee;'>Sao Paulo, Brasil</td></tr></table><a href='#' style='display:inline-block;padding:10px 20px;background:#4285f4;color:white;border-radius:4px;text-decoration:none;'>Verificar atividade</a></div>",
  },
];

export function mockGenerateIdentity(): MockIdentity {
  const emailId = randomHex(10);
  const now = new Date();
  const identity: MockIdentity = {
    emailId,
    emailAddress: `${emailId}@${FAKE_EMAIL_DOMAIN}`,
    phoneNumber: generateFakePhoneBR(),
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + IDENTITY_TTL_HOURS * 60 * 60 * 1000).toISOString(),
  };

  const messages: MockEmail[] = sampleEmails.map((email, i) => ({
    ...email,
    id: randomHex(24),
    receivedAt: new Date(now.getTime() - i * 5 * 60 * 1000).toISOString(),
  }));

  mockStore.set(emailId, { identity, messages });
  return identity;
}

export function mockGetInbox(emailId: string): { identity: MockIdentity; messages: MockEmail[] } | null {
  return mockStore.get(emailId) ?? null;
}
