import express from 'express';
import { userRouter } from './routes/user';
import cookieParser from "cookie-parser";
import authMiddle from "./middleware";
import cors from 'cors';
import { zapRouter } from './routes/zap';
import { triggerRouter } from './routes/trigger';
import { actionRouter } from './routes/action';


const app = express();


// Parse incoming JSON requests
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Enable CORS
const corsOptions = {
    origin: ["https://app-pomodoro.wedevelopers.online", "http://localhost:3000", "http://localhost:3001"],
    credentials: true, // Enable credentials (cookies)
};
app.use(cors(corsOptions));

// Authentication middleware
app.use(authMiddle);

// API routes
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/zap/", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

// Error handling middleware
app.use((err:any, req:any, res:any, next:any) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
});
