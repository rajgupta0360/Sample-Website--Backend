import express from 'express';
import { createClient, getClients } from './client.controller.js';
import upload from '../../middlewares/fileupload.middleware.js';

const clientRouter = express.Router();

// Define client routes here
clientRouter.post('/', upload.single('image'),createClient);
clientRouter.get('/', getClients);

export default clientRouter;