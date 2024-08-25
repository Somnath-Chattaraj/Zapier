import express from 'express'
import { userRouter } from './routes/user';
import cookieParser from "cookie-parser";
import authMiddle from "./middleware";
import { zapRouter } from './routes/zap';

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use(authMiddle);

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/zap/", zapRouter);

app.listen(3001, () => {    
    console.log('Server running on port 3001')
});
