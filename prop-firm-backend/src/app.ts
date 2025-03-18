import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import accountRouter from './routers/accountRouter';
import adminRouter from './routers/adminRouter';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'PATCH'], // Explicitly allow PUT
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/auth', authRouter);
app.use('/accounts', accountRouter);
app.use('/admin', adminRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(400).json({ message: err.message });
});

export default app;