import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  participants: string[]; // user ids
  lastMessage?: string; // encrypted
  lastAt?: Date;
}

const ConversationSchema: Schema = new Schema(
  {
    participants: { type: [String], required: true },
    lastMessage: { type: String },
    lastAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);
