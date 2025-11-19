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
const allowedOrigin = process.env.FRONTEND_URL;

const origins = [
    allowedOrigin,
    "https://sample-website-frontend.vercel.app",
    "http://localhost:5173" // Keep this for redundancy and clarity in local testing
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the requesting origin is in our allowed list
        if (origins.includes(origin)) {
            return callback(null, true);
        } else {
            console.log(`Blocked CORS request from origin: ${origin}`);
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
}));

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