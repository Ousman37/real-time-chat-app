// server/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the IUser interface with additional fields for the profile
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string; // Optional field for profile picture URL
  bio?: string; // Optional field for user bio or description
  createdAt: Date;
  updatedAt: Date;
}

// Define the UserSchema with the additional fields
const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"], // Custom error message
      unique: true, // Ensure username is unique
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Custom error message
      unique: true,
      lowercase: true, // Store email in lowercase
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message
    },
    profilePicture: {
      type: String,
      default: "default-profile.png", // Default profile picture if none is provided
    },
    bio: {
      type: String,
      default: "", // Default empty bio
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Mongoose model with the IUser interface for type safety
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
