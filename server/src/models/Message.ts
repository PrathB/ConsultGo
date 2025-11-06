import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  consultationId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  content: string;
  type: "text" | "file" | "image" | "prescription";
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  consultationId: { type: Schema.Types.ObjectId, ref: "Consultation", required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["text", "file", "image", "prescription"], default: "text" },
  createdAt: { type: Date, default: Date.now },
});

export default model<IMessage>("Message", messageSchema);
