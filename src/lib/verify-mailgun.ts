import crypto from "crypto";

export function verifyMailgunSignature(
  signingKey: string,
  timestamp: string,
  token: string,
  signature: string
): boolean {
  const hmac = crypto.createHmac("sha256", signingKey);
  hmac.update(timestamp + token);
  const digest = hmac.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
