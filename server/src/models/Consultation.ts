import { Schema, model, Document } from "mongoose";

export interface IConsultation extends Document {
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  dailyRoomId?: string; // from Daily API
  transcriptionId?: Schema.Types.ObjectId; // Deepgram transcript
  paymentId?: Schema.Types.ObjectId;
  scheduledAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  notes?: string;
  prescriptionUrl?: string;
  createdAt: Date;
}

const consultationSchema = new Schema<IConsultation>({
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["scheduled", "in_progress", "completed", "cancelled"],
    default: "scheduled",
  },
  dailyRoomId: { type: String },
  transcriptionId: { type: Schema.Types.ObjectId, ref: "Transcription" },
  paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
  scheduledAt: { type: Date, required: true },
  startedAt: { type: Date },
  endedAt: { type: Date },
  notes: { type: String },
  prescriptionUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model<IConsultation>("Consultation", consultationSchema);
