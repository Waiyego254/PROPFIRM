import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import jwt from 'jsonwebtoken';
import { AccountService } from '../services/accountService';

const accountService = new AccountService();
const authService = new AuthService();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body; // CHANGED: Removed role
    try {
        const user = await authService.register(username, password, email);
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered', user, token });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in', user, token });
    } catch (error) {
        next(error);
    }
};