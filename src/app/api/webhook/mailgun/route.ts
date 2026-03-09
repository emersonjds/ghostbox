import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { FakeIdentity } from "@/lib/models/fake-identity";
import { EmailMessage } from "@/lib/models/email-message";
import { verifyMailgunSignature } from "@/lib/verify-mailgun";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const timestamp = formData.get("timestamp") as string;
    const token = formData.get("token") as string;
    const signature = formData.get("signature") as string;

    const signingKey = process.env.MAILGUN_SIGNING_KEY;
    if (!signingKey) {
      console.error("MAILGUN_SIGNING_KEY not configured");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (!verifyMailgunSignature(signingKey, timestamp, token, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const recipient = formData.get("recipient") as string;
    const from = formData.get("from") as string;
    const subject = formData.get("subject") as string;
    const bodyPlain = formData.get("body-plain") as string;
    const bodyHtml = formData.get("body-html") as string;

    await connectDB();

    const identity = await FakeIdentity.findOne({ emailAddress: recipient });
    if (!identity) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    await EmailMessage.create({
      identityId: identity._id,
      emailAddress: recipient,
      from: from || "unknown",
      subject: subject || "(no subject)",
      bodyPlain: bodyPlain || "",
      bodyHtml: bodyHtml || "",
      expiresAt: identity.expiresAt,
    });

    return NextResponse.json({ message: "Stored" }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
