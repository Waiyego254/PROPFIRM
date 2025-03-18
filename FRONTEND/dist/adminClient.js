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
// frontend/src/adminClient.ts
const BASE_URL = 'http://localhost:3000'; // Adjust if needed
class AdminClient {
    constructor(token) {
        this.token = token;
    }
    fetchAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    fetchAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/accounts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    fetchAllTrades() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/trades`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    fetchDashboardStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    toggleAccountStatus(accountId, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/toggle-account`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ accountId, isActive })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    changeUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/change-role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ userId, role })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    fetchAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/accounts/transactions/get-all-transactions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    createPropAccount(title, tradingBalance, challengeFee) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/prop-accounts/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ title, tradingBalance, challengeFee })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    updatePropAccount(id, title, tradingBalance, challengeFee) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/prop-accounts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ title, tradingBalance, challengeFee })
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
    fetchAllPropAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/admin/prop-accounts/get-all-accounts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok)
                throw new Error(yield response.text());
            return response.json();
        });
    }
}
// Expose adminClient globally
window.adminClient = function (token) {
    return new AdminClient(token);
};
