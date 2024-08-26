// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"], // Added custom error message
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Added custom error message
    unique: true,
    lowercase: true, // Ensures emails are stored in lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Added custom error message
  },
});

// Mongoose model with explicit interface to ensure type safety
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
