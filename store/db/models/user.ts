import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});

const User = models.User || model('user', userSchema);
export default User;