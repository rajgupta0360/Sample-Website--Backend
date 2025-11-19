import SubscribedEmail from "./subscribedEmail.model.js";

export const createSubscribedEmail = async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        // check if email already exists
        const existingEmail = await SubscribedEmail.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }     
        const newSubscribedEmail = new SubscribedEmail({ email });
        await newSubscribedEmail.save();
        res.status(201).json({ message: "Subscribed email created successfully", newSubscribedEmail });
    }
    catch (error) {
        console.log("Error in creating subscribed email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSubscribedEmails = async (req, res) => {
    try {
        const emails = await SubscribedEmail.find();
        res.status(200).json({ message: "Subscribed emails fetched successfully", emails });
    }
    catch (error) {
        console.log("Error in getting subscribed emails:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}