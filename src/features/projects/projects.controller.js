import Project from "./projects.model.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ message: "Projects fetched successfully", projects });
    }
    catch(error){
        console.log("Error in getting projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { path, filename } = req.file;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        } 
        console.log("createProject checking what is indside req.file",req.file);
        const newProject = { title, description, image: filename, path: path };
        const project = new Project(newProject);
        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    }
    catch(error){
        console.log("Error in creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}