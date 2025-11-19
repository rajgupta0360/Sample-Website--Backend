// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const url = process.env.DB_URL;
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(`${url}/flipr_db`);
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.log("Error connecting to database:", error);
//     }
// };

// export default connectDB;



import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define a variable in the global scope to hold the cached connection
// In a Node.js environment, `global` persists state between function calls on the same serverless instance.
let cached = global.mongoose;

if (!cached) {
    // Initialize the cache object if it doesn't exist
    cached = global.mongoose = { conn: null, promise: null };
}

const url = process.env.DB_URL; // Uses the full connection string from your Vercel Environment Variables

const connectDB = async () => {
    // 1. Return the cached connection if it exists
    if (cached.conn) {
        console.log("Database: Using existing connection");
        return cached.conn;
    }

    // 2. If a connection promise is already in progress, wait for it
    if (!cached.promise) {
        const connectionString = `${url}/flipr_db`; // Append database name here

        // Connection options specific to serverless/Mongoose best practice
        const opts = {
            // Stops Mongoose from buffering operations if not connected (recommended for serverless)
            bufferCommands: false,
            // Avoids Mongoose's automatic index building on connect (recommended for production)
            autoIndex: false,
            serverSelectionTimeoutMS: 5000, // Reduced timeout for faster feedback on failed connections
        };

        // Create the connection promise
        cached.promise = mongoose.connect(connectionString, opts)
            .then((mongoose) => {
                // If successful, return the Mongoose object
                return mongoose;
            })
            .catch((error) => {
                console.error("Error connecting to database:", error);
                // Clear the promise so the next request can try again
                cached.promise = null;
                throw error;
            });
    }

    // 3. Wait for the connection to resolve and cache it
    try {
        cached.conn = await cached.promise;
        console.log("Database: New connection established successfully");
        return cached.conn;
    } catch (error) {
        throw error;
    }
};

export default connectDB;