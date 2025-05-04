"use server";
import { connectDB } from "@/database/libs/mongodb";
import User from "@/database/models/user";
import bcrypt from "bcrypt";

export async function registerUser(values: { email: string; password: string }) {
  const { email, password } = values;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  await connectDB(); 

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return { message: "User registered successfully" };
}
