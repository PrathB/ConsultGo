import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "doctor" | "patient" | "admin";
  specialization?: string; // for doctor
  avatar?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient", "admin"], required: true },
  specialization: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model<IUser>("User", userSchema);
