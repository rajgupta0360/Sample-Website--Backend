import express from 'express';
import { createSubscribedEmail, getSubscribedEmails } from './subscribedEmail.controller.js';

const subscribedEmailRouter = express.Router();

subscribedEmailRouter.post('/', createSubscribedEmail);
subscribedEmailRouter.get('/', getSubscribedEmails);

export default subscribedEmailRouter;