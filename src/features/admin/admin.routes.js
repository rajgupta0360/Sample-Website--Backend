import express from 'express';
import { logIn, signUp } from './admin.controller.js';

const adminRouter = express.Router();

adminRouter.post('/signup', signUp);
adminRouter.post('/login', logIn);

export default adminRouter;