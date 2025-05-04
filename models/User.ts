import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // Otros campos que necesites
});

const User = models.User || model("User", UserSchema);

export default User;
