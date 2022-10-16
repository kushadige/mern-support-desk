import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectDB from './config/db.js';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/error.middleware.js';

// Connect to database
await connectDB();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
    // set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => res.sendFile(__dirname, '../frontend/build/index.html'));
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' });
    });
}

// Middlewares
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});