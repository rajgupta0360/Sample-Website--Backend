import mongoose from "mongoose";

const subscribedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

const SubscribedEmail = mongoose.model("SubscribedEmail", subscribedEmailSchema);
export default SubscribedEmail;