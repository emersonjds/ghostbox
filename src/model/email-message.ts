import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEmailMessage extends Document {
  identityId: Types.ObjectId;
  emailAddress: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml: string;
  receivedAt: Date;
  expiresAt: Date;
}

const EmailMessageSchema = new Schema<IEmailMessage>({
  identityId: { type: Schema.Types.ObjectId, ref: "FakeIdentity", required: true, index: true },
  emailAddress: { type: String, required: true },
  from: { type: String, required: true },
  subject: { type: String, default: "(no subject)" },
  bodyPlain: { type: String, default: "" },
  bodyHtml: { type: String, default: "" },
  receivedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const EmailMessage: Model<IEmailMessage> =
  mongoose.models.EmailMessage ||
  mongoose.model<IEmailMessage>("EmailMessage", EmailMessageSchema);
