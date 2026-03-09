import { NextRequest, NextResponse } from "next/server";
import { USE_MOCK, mockGetInbox } from "@/lib/mock-data";
import { connectDB } from "@/lib/mongodb";
import { FakeIdentity } from "@/model/fake-identity";
import { EmailMessage } from "@/model/email-message";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ emailId: string }> },
) {
  try {
    const { emailId } = await params;

    if (USE_MOCK) {
      const data = mockGetInbox(emailId);
      if (!data) {
        return NextResponse.json(
          { error: "Identity not found or expired" },
          { status: 404 },
        );
      }
      return NextResponse.json(data);
    }

    await connectDB();

    const identity = await FakeIdentity.findOne({ emailId }).lean();
    if (!identity) {
      return NextResponse.json(
        { error: "Identity not found or expired" },
        { status: 404 },
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
      messages: messages.map((msg: any) => ({
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
      { status: 500 },
    );
  }
}
