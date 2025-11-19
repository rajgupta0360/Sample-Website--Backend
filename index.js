import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import adminRouter from './src/features/admin/admin.routes.js';
import connectDB from './src/database/db.js';
import clientRouter from './src/features/clients/client.routes.js';
import projectsRouter from './src/features/projects/projects.routes.js';
import contactRouter from './src/features/contact/contact.routes.js';
import subscribedEmailRouter from './src/features/subscribed email/subscribedEmail.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://sample-website-frontend.vercel.app/",
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for handling form data
app.use(express.static("uploads"));


app.use('/api/admin', adminRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientRouter);
app.use('/api/contact-form', contactRouter);
app.use('/api/subscribed-email', subscribedEmailRouter);

app.get('/', (req, res) => {
    res.send('Flipr Placement Drive Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    connectDB();
});