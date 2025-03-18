"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'http://localhost:3000';
const base_Url = 'http://localhost:3000';
class AccountClient {
    constructor(token) {
        this.token = token;
    }
    createAccount(userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ userId, type })
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(errorText || 'Failed to create account');
            }
            const data = yield response.json();
            return { id: data.accountId };
        });
    }
    purchaseAccount(accountId, depositAmount, tradingBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ accountId, depositAmount, tradingBalance })
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(errorText || 'Failed to purchase account');
            }
        });
    }
    getAllPropAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${base_Url}/admin/prop-accounts/get-all-accounts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            const data = yield response.json();
            return data.propAccounts;
        });
    }
    createTransaction(userId, accountId, propAccountId, depositAmount, tradingBalance, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ userId, accountId, propAccountId, depositAmount, tradingBalance, title })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            const data = yield response.json();
            return data.transaction;
        });
    }
    getUserTransactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/transactions/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            const data = yield response.json();
            return data.transactions;
        });
    }
    simulateTrade(accountId, transactionId, amount, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/simulate-trade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ accountId, transactionId, amount, description })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            const data = yield response.json();
            return data.trade;
        });
    }
    getUserTradeTransactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${API_URL}/accounts/trade-transactions/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            const data = yield response.json();
            return data.trades;
        });
    }
}
window.accountClient = function (token) {
    return new AccountClient(token);
};
