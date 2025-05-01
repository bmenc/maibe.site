import { NextResponse } from "next/server";
import User from "@/old/models/user";
import { connectDB } from "@/old/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    console.log('Received email:', email);

    try {
        console.log("Connecting to the database...");
        await connectDB();
        console.log("Database connected successfully");

        const userFound = await User.findOne({ email });
        console.log("User found:", userFound);

        if (userFound) {
            console.error("Email already in use");
            return NextResponse.json({ message: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully");

        const user = new User({ email, password: hashedPassword });
        const savedUser = await user.save();
        console.log("User saved successfully:", savedUser);

        return NextResponse.json(savedUser, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
        } else {
            console.error("Error creating user:", error);
        }
        return NextResponse.json({ 
            message: "Internal server error", 
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}