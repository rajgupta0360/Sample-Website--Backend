import { Client } from "./client.model.js"

export const getClients = async(req, res) => {
    try {
        // Logic to get clients from the database
        const clients = await Client.find();
        res.status(200).json({message: "Clients fetched successfully", clients});
    }
    catch (error) {
        console.log("Error in getting clients:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

export const createClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;
        const { path, filename } = req.file;
        const newClient = { name, description, designation, image: filename, path: path };
        const client = new Client(newClient);
        await client.save();
        res.status(201).json({ message: "Client created successfully", client });
    }
    catch (error) {
        console.log("Error in creating client:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}