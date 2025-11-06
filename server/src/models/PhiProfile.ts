import { Schema, model, Document } from "mongoose";

export interface IPHIData extends Document {
  userId: Schema.Types.ObjectId; // link to User
  name?: string;
  phone?: string;
  medicalHistory?: string[];
  address?: string;
  dob?: string;
  encrypted?: boolean; // mark if encrypted
  lastUpdated: Date;
}

const phiSchema = new Schema<IPHIData>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String },
  phone: { type: String },
  medicalHistory: [{ type: String }],
  address: { type: String },
  dob: { type: String },
  encrypted: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now },
});

export default model<IPHIData>("PHIData", phiSchema);
