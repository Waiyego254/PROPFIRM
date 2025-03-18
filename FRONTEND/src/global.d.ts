// frontend/src/global.d.ts
interface Window {
    loginClient: LoginClient;
    accountClient: (token: string) => AccountClient;
    jwt_decode: (token: string) => any
}

// Define the LoginClient interface to match the class
interface LoginClient {
    login(email: string, password: string): Promise<{ token: string, role: string }>;
    register(username: string, email: string, password: string): Promise<{ token: string }>;
}

// Define the AccountClient interface to match the class
interface AccountClient {
    createAccount(userId: string, type: 'live' | 'demo'): Promise<{ id: string }>;
    purchaseAccount(accountId: string, depositAmount: number, tradingBalance: number): Promise<void>;
}