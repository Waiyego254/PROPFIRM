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
const baseUrl = 'http://localhost:3000';
class LoginClient {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(errorText || 'Login failed');
            }
            const data = yield response.json();
            return { token: data.token, role: data.user.role };
        });
    }
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(errorText || 'Registration failed');
            }
            const data = yield response.json();
            return { token: data.token };
        });
    }
}
// Expose loginClient globally
window.loginClient = new LoginClient();
