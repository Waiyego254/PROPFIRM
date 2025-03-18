import poolPromise from '../config/dbConfig';
import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';

// NEW: Joi schemas for account operations
const createAccountSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    type: Joi.string().valid('demo', 'live').required(),
    balance: Joi.number().min(0).default(0),
});

const purchaseAccountSchema = Joi.object({
    accountId: Joi.string().uuid().required(),
    depositAmount: Joi.number().positive().required(),
    tradingBalance: Joi.number().positive().required(),
});

const tradeSchema = Joi.object({
    accountId: Joi.string().uuid().required(),
    amount: Joi.number().negative().required(),
    description: Joi.string().required(),
});

const transactionSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    accountId: Joi.string().uuid().required(),
    propAccountId: Joi.string().uuid().required(),
    depositAmount: Joi.number().positive().required(),
    tradingBalance: Joi.number().positive().required(),
    title: Joi.string().required()
});

export class AccountService {
    async createAccount(userId: string, type: string, balance: number = 0) {
        const { error } = createAccountSchema.validate({ userId, type, balance });
        if (error) throw new Error(error.details[0].message);

        const accountId = uuidv4();
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.UniqueIdentifier, accountId)
            .input('userId', sql.UniqueIdentifier, userId)
            .input('type', sql.VarChar, type)
            .input('balance', sql.Decimal(15, 2), balance)
            .execute('sp_CreateAccount');
        return { id: result.recordset[0].id, type };
    }

    async purchaseAccount(accountId: string, depositAmount: number, tradingBalance: number) {
        const { error } = purchaseAccountSchema.validate({ accountId, depositAmount, tradingBalance });
        if (error) throw new Error(error.details[0].message);

        const purchaseId = uuidv4();
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.UniqueIdentifier, purchaseId)
            .input('accountId', sql.UniqueIdentifier, accountId)
            .input('depositAmount', sql.Decimal(15, 2), depositAmount)
            .input('tradingBalance', sql.Decimal(15, 2), tradingBalance)
            .execute('sp_PurchaseAccount');
        return { accountId, depositAmount, tradingBalance };
    }

    async getUserAccounts(userId: string) {
        const { error } = Joi.string().uuid().required().validate(userId);
        if (error) throw new Error('Invalid user ID');

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .execute('sp_GetUserAccounts');
        return result.recordset;
    }

    async simulateTrade(accountId: string, transactionId: string, amount: number, description: string) {
        const { error } = Joi.object({
            accountId: Joi.string().uuid().required(),
            transactionId: Joi.string().uuid().required(),
            amount: Joi.number().negative().required(),
            description: Joi.string().required()
        }).validate({ accountId, transactionId, amount, description });
        if (error) throw new Error(error.details[0].message);
    
        const tradeId = uuidv4();
        const pool = await poolPromise;
        const result = await pool.request()
            .input('tradeId', sql.UniqueIdentifier, tradeId)
            .input('transactionId', sql.UniqueIdentifier, transactionId)
            .input('accountId', sql.UniqueIdentifier, accountId)
            .input('amount', sql.Decimal(15, 2), amount)
            .input('description', sql.VarChar, description)
            .execute('sp_SimulateTrade');
        return result.recordset[0];
    }

    async getUserTradeTransactions(userId: string) {
        const { error } = Joi.string().uuid().required().validate(userId);
        if (error) throw new Error('Invalid user ID');

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .query('SELECT tradeId, accountId, amount, description, tradeDate ' +
                   'FROM TradeTransactions tt ' +
                   'WHERE EXISTS (SELECT 1 FROM PropTransactions pt WHERE pt.accountId = tt.accountId AND pt.userId = @userId)');
        return result.recordset;
    }

    async createTransaction(userId: string, accountId: string, propAccountId: string, depositAmount: number, tradingBalance: number, title: string) {
        const { error } = transactionSchema.validate({ userId, accountId, propAccountId, depositAmount, tradingBalance, title });
        if (error) throw new Error(error.details[0].message);

        const transactionId = uuidv4();
        const pool = await poolPromise;
        const result = await pool.request()
            .input('transactionId', sql.UniqueIdentifier, transactionId)
            .input('userId', sql.UniqueIdentifier, userId)
            .input('accountId', sql.UniqueIdentifier, accountId)
            .input('propAccountId', sql.UniqueIdentifier, propAccountId)
            .input('depositAmount', sql.Decimal(15, 2), depositAmount)
            .input('tradingBalance', sql.Decimal(15, 2), tradingBalance)
            .input('title', sql.VarChar, title)
            .execute('sp_CreateTransaction');
        return result.recordset[0];
    }

    async getUserTransactions(userId: string) {
        const { error } = Joi.string().uuid().required().validate(userId);
        if (error) throw new Error('Invalid user ID');

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.UniqueIdentifier, userId)
            .execute('sp_GetUserTransactions');
        return result.recordset;
    }

    async getAllTransactions() {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT transactionId, userId, accountId, propAccountId, depositAmount, tradingBalance, title, purchaseDate FROM PropTransactions');
        return result.recordset;
    }
}
