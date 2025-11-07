import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  conversation: string;
  sender: string;
  content: string; // encrypted payload
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    conversation: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
