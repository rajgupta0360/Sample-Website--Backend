import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;
const connectDB = async () => {
    try {
        const conn =await mongoose.connect(`${url}/flipr_db`);
        console.log("Database connected successfully", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
};

export default connectDB;