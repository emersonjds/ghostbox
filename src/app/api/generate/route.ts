import { NextResponse } from "next/server";
import { USE_MOCK, mockGenerateIdentity } from "@/lib/mock-data";
import { connectDB } from "@/lib/mongodb";
import { FakeIdentity } from "@/model/fake-identity";
import { generateUniqueEmail } from "@/lib/generate-email";
import { generateFakePhoneBR } from "@/lib/generate-phone";
import { IDENTITY_TTL_HOURS } from "@/lib/constants";

export async function POST() {
  try {
    if (USE_MOCK) {
      const identity = mockGenerateIdentity();
      return NextResponse.json(identity);
    }

    await connectDB();

    const { emailId, emailAddress } = await generateUniqueEmail();
    const phoneNumber = generateFakePhoneBR();

    const expiresAt = new Date(Date.now() + IDENTITY_TTL_HOURS * 60 * 60 * 1000);

    const identity = await FakeIdentity.create({
      emailId,
      emailAddress,
      phoneNumber,
      expiresAt,
    });

    return NextResponse.json({
      emailId: identity.emailId,
      emailAddress: identity.emailAddress,
      phoneNumber: identity.phoneNumber,
      createdAt: identity.createdAt,
      expiresAt: identity.expiresAt,
    });
  } catch (error) {
    console.error("Error generating identity:", error);
    return NextResponse.json(
      { error: "Failed to generate identity" },
      { status: 500 }
    );
  }
}
