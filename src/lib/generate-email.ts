import crypto from "crypto";
import { FAKE_EMAIL_DOMAIN } from "./constants";
import { connectDB } from "./mongodb";
import { FakeIdentity } from "@/model/fake-identity";

function randomSlug(length = 10): string {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

export async function generateUniqueEmail(): Promise<{ emailId: string; emailAddress: string }> {
  await connectDB();

  const maxAttempts = 5;
  for (let i = 0; i < maxAttempts; i++) {
    const emailId = randomSlug();
    const emailAddress = `${emailId}@${FAKE_EMAIL_DOMAIN}`;

    const exists = await FakeIdentity.findOne({ emailId }).lean();
    if (!exists) {
      return { emailId, emailAddress };
    }
  }

  throw new Error("Failed to generate unique email after multiple attempts");
}
