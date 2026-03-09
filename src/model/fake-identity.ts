import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFakeIdentity extends Document {
  emailId: string;
  emailAddress: string;
  phoneNumber: string;
  createdAt: Date;
  expiresAt: Date;
}

const FakeIdentitySchema = new Schema<IFakeIdentity>({
  emailId: { type: String, required: true, unique: true, index: true },
  emailAddress: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const FakeIdentity: Model<IFakeIdentity> =
  mongoose.models.FakeIdentity ||
  mongoose.model<IFakeIdentity>("FakeIdentity", FakeIdentitySchema);
