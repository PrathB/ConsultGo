import { Schema, model, Document } from "mongoose";

export interface ITranscription extends Document {
  consultationId: Schema.Types.ObjectId;
  transcriptText: string;
  confidence?: number;
  createdAt: Date;
}

const transcriptionSchema = new Schema<ITranscription>({
  consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
  transcriptText: { type: String, required: true },
  confidence: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITranscription>("Transcription", transcriptionSchema);
