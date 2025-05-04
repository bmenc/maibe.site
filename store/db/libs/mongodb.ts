import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(MONGODB_URI);
        if (connection.readyState === 1) {
            console.log("MDB connected");
            return Promise.resolve(true);
        }
    } catch (error) {
        console.log("MDB connection error:", error);
        return Promise.reject(new Error("MDB connection error"));
    }
};
