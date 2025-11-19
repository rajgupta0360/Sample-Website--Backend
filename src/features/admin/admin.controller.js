import { Admin } from "./admin.model.js";
import bcrypt from "bcrypt";

export const signUp = async(req, res) => {
    // Logic for admin sign-up
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if admin already exists (pseudo code)
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    }
    catch (error) {
        console.log("Error in admin sign-up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logIn = async(req, res) => {
    // Logic for admin login
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // fetching the details
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "This email is not registered" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", admin });
    }
    catch(error) {
        console.log("Error in admin login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}