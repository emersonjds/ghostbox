import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { FakeIdentity } from "@/lib/models/fake-identity";
import { EmailMessage } from "@/lib/models/email-message";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ emailId: string }> }
) {
  try {
    await connectDB();

    const { emailId } = await params;

    const identity = await FakeIdentity.findOne({ emailId }).lean();
    if (!identity) {
      return NextResponse.json(
        { error: "Identity not found or expired" },
        { status: 404 }
      );
    }

    const messages = await EmailMessage.find({ identityId: identity._id })
      .sort({ receivedAt: -1 })
      .lean();

    return NextResponse.json({
      identity: {
        emailId: identity.emailId,
        emailAddress: identity.emailAddress,
        phoneNumber: identity.phoneNumber,
        createdAt: identity.createdAt,
        expiresAt: identity.expiresAt,
      },
      messages: messages.map((msg) => ({
        id: msg._id,
        from: msg.from,
        subject: msg.subject,
        bodyPlain: msg.bodyPlain,
        bodyHtml: msg.bodyHtml,
        receivedAt: msg.receivedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching inbox:", error);
    return NextResponse.json(
      { error: "Failed to fetch inbox" },
      { status: 500 }
    );
  }
}
