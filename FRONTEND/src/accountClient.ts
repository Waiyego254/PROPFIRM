const API_URL = 'http://localhost:3000';
const base_Url = 'http://localhost:3000';



class AccountClient {
    constructor(private token: string) {}

  

    async createAccount(userId: string, type: 'live' | 'demo'): Promise<{ id: string }> {
        const response = await fetch(`${API_URL}/accounts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ userId, type })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to create account');
        }
        const data = await response.json();
        return { id: data.accountId };
    }

    async purchaseAccount(accountId: string, depositAmount: number, tradingBalance: number): Promise<void> {
        const response = await fetch(`${API_URL}/accounts/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ accountId, depositAmount, tradingBalance })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to purchase account');
        }
    }

    async getAllPropAccounts(): Promise<any[]> {
        const response = await fetch(`${base_Url}/admin/prop-accounts/get-all-accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.propAccounts;
    }

    async createTransaction(userId: any, accountId: any, propAccountId: any, depositAmount: any, tradingBalance: any, title: any) {
        const response = await fetch(`${API_URL}/accounts/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ userId, accountId, propAccountId, depositAmount, tradingBalance, title })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.transaction;
    }

    async getUserTransactions(userId: any) {
        const response = await fetch(`${API_URL}/accounts/transactions/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.transactions;
    }

    async simulateTrade(accountId: string, transactionId:string, amount: number, description: string) {
        const response = await fetch(`${API_URL}/accounts/simulate-trade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ accountId, transactionId, amount, description })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.trade;
    }

    async getUserTradeTransactions(userId: any) {
        const response = await fetch(`${API_URL}/accounts/trade-transactions/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.trades;
    }


}

window.accountClient = function(token: string) {
    return new AccountClient(token);
};