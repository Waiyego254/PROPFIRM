import express from 'express';
import { getAllUsers, getAllAccounts, getAllTrades, getDashboardStats, toggleAccountStatus, changeUserRole, createPropAccount, getAllPropAccounts, updatePropAccount } from '../controllers/adminController';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '../../types';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const adminMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if ((req.user as CustomJwtPayload)?.role !== 'admin') {
        res.status(403).json({ message: 'Admin access required' });
        return;
    }
    next();
};

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/accounts', authMiddleware, adminMiddleware, getAllAccounts);
router.get('/trades', authMiddleware, adminMiddleware, getAllTrades);
router.get('/stats', authMiddleware, adminMiddleware, getDashboardStats);
router.patch('/toggle-account', authMiddleware, adminMiddleware, toggleAccountStatus);
router.patch('/change-role', authMiddleware, adminMiddleware, changeUserRole); // NEW: Role change route
router.post('/prop-accounts/create', authMiddleware, adminMiddleware, createPropAccount);
router.put('/prop-accounts/:id', authMiddleware, adminMiddleware, updatePropAccount);
router.get('/prop-accounts/get-all-accounts', authMiddleware, getAllPropAccounts); // Allow users to fetch for display

export default router;