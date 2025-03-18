import poolPromise from '../config/dbConfig';
import sql from 'mssql';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';

// NEW: Joi schema for role change
const changeRoleSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    role: Joi.string().valid('user', 'admin').required(),
});

export class AdminService {
    async getAllUsers() {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetAllUsers');
        return result.recordset;
    }

    async getAllAccounts() {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetAllAccounts');
        return result.recordset;
    }

    async getAllTrades() {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetAllTrades');
        return result.recordset;
    }

    async getDashboardStats() {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetDashboardStats');
        return result.recordset[0];
    }

    async getTotalTraders() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT COUNT(DISTINCT userId) as count FROM Accounts WHERE type = \'live\' AND isActive = 1');
        return result.recordset[0].count;
    }
    
    async getTotalTrades() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT COUNT(*) as count FROM TradeTransactions');
        return result.recordset[0].count;
    }
    
    async getTotalLiveBalance() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT SUM(tradingBalance) as total FROM PropTransactions');
        return result.recordset[0].total || 0;
    }

    async toggleAccountStatus(accountId: string, isActive: boolean) {
        const { error } = Joi.object({
            accountId: Joi.string().uuid().required(),
            isActive: Joi.boolean().required(),
        }).validate({ accountId, isActive });
        if (error) throw new Error(error.details[0].message);

        const pool = await poolPromise;
        await pool.request()
            .input('accountId', sql.UniqueIdentifier, accountId)
            .input('isActive', sql.Bit, isActive ? 1 : 0)
            .execute('sp_ToggleAccountStatus');
        return { accountId, isActive };
    }

    // NEW: Change user role
    async changeUserRole(userId: string, role: string) {
        const { error } = changeRoleSchema.validate({ userId, role });
        if (error) throw new Error(error.details[0].message);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .input('role', sql.VarChar, role)
            .execute('sp_ChangeUserRole');
        return result.recordset[0];
    }

    async createPropAccount(title: string, tradingBalance: number, challengeFee: number) {
        const { error } = Joi.object({
            title: Joi.string().required(),
            tradingBalance: Joi.number().positive().required(),
            challengeFee: Joi.number().positive().required()
        }).validate({ title, tradingBalance, challengeFee });
        if (error) throw new Error(error.details[0].message);

        const pool = await poolPromise;
        const id = uuidv4();
        const result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .input('title', sql.VarChar, title)
            .input('tradingBalance', sql.Decimal(15, 2), tradingBalance)
            .input('challengeFee', sql.Decimal(15, 2), challengeFee)
            .execute('sp_CreatePropAccount');
        return result.recordset[0];
    }

    async updatePropAccount(id: string, title: string, tradingBalance: number, challengeFee: number) {
        const { error } = Joi.object({
            id: Joi.string().uuid().required(),
            title: Joi.string().required(),
            tradingBalance: Joi.number().positive().required(),
            challengeFee: Joi.number().positive().required()
        }).validate({ id, title, tradingBalance, challengeFee });
        if (error) throw new Error(error.details[0].message);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .input('title', sql.VarChar, title)
            .input('tradingBalance', sql.Decimal(15, 2), tradingBalance)
            .input('challengeFee', sql.Decimal(15, 2), challengeFee)
            .execute('sp_UpdatePropAccount');
        return result.recordset[0];
    }

    async getAllPropAccounts() {
        const pool = await poolPromise;
        const result = await pool.request().execute('sp_GetAllPropAccounts');
        return result.recordset;
    }
}