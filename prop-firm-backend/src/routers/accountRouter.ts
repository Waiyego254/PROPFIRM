import express from 'express';
import { createAccount, purchaseAccount, getAccounts, simulateTrade, createTransaction, getUserTransactions, getAllTransactions, getUserTradeTransactions } from '../controllers/accountController';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, username: string, role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

router.post('/create', authMiddleware, createAccount);
router.post('/purchase', authMiddleware, purchaseAccount);
router.get('/:userId', authMiddleware, getAccounts);
router.post('/simulate-trade', authMiddleware, simulateTrade);
router.get('/trade-transactions/:userId', authMiddleware, getUserTradeTransactions);

router.post('/transactions', authMiddleware, createTransaction);
router.get('/transactions/get-all-transactions', authMiddleware, getAllTransactions);
router.get('/transactions/:userId', authMiddleware, getUserTransactions);


export default router;