import express from 'express';
import { createProject, getProjects } from './projects.controller.js';
import upload from '../../middlewares/fileupload.middleware.js';

const projectsRouter = express.Router();

// Define client routes here
projectsRouter.get('/', getProjects);
projectsRouter.post('/', upload.single('image'), createProject);

export default projectsRouter;