import express from 'express';
import { createDoc, getDoc } from './contact.controller.js';

const contactRouter = express.Router();

// Define contact routes here
contactRouter.get('/', getDoc);
contactRouter.post('/', createDoc);

export default contactRouter;