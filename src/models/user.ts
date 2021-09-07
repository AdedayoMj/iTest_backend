import mongoose, { Schema } from 'mongoose';
import IUser from '../interface/user';

const UserSchema: Schema = new Schema({
    uid: { type: String, unique: true },
    name: { type: String },
    email: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
