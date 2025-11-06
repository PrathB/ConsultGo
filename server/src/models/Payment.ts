import { Schema, model, Document } from "mongoose";

export interface IPayment extends Document {
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  squareTransactionId?: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  squareTransactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model<IPayment>("Payment", paymentSchema);
