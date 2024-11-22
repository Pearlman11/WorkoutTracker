import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Use optional chaining to ensure `mongoose.models.User` is checked safely
const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;

