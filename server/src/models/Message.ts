import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  text: string;
  username: string;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
