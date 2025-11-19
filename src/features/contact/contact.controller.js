import Contact from "./contact.model.js";

export const getDoc = async(req, res) => {
    try {
        const doc = await Contact.find();
        res.status(200).json({ message: "Doc fetched successfully", doc });
    }
    catch (error) {
     console.log("Error in getting doc:", error);
     res.status(500).json({ message: "Internal server error" });   
    }
}

export const createDoc = async (req, res) => {
    try {
        const { name, email, mobile, city } = req.body;
        if(!name || !email || !mobile || !city){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newDoc = { name, email, mobile, city };
        const doc = new Contact(newDoc);
        await doc.save();
        return res.status(201).json({ message: "Doc created successfully", doc });
    }
    catch (error) {
        console.log("Error in creating doc:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}