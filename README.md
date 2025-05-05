#  PropFirm Trading Account Platform

A web-based platform that allows users to purchase and manage trading accounts, built using Node.js for the backend and TypeScript, HTML, CSS for the frontend. This project simulates a proprietary trading environment with admin control and real-time user restrictions to ensure disciplined trading.

---

# Overview

This platform is designed for aspiring traders who want to prove their trading skills by purchasing **trading evaluation accounts**. A user can buy a trading account, access its details, and begin trading (via simulation or live API integration if extended). However, a user cannot purchase a new account until their existing trading account is completed (pass/fail).

Admins manage user accounts, oversee trading status, and control platform settings and account availability.

---

# User Features

-  User authentication (login/logout)
- View available trading accounts
- Purchase a trading account (only one active at a time)
-  Monitor account status: active, in progress, passed, failed
- View live trading stats (e.g., PnL, drawdown, trade history)*
- View trading rules and objectives (e.g., profit targets, max loss)

 Note: Live stats can be mocked or fetched from a broker API (e.g., MetaTrader, cTrader) if integrated.

---

#Admin Features

- Admin dashboard to manage users and accounts
-  Approve or reject user accounts
-  Configure trading objectives (profit target, drawdown limits)
-  Reset or terminate accounts
-  Monitor user progress and platform statistics

---

## Tech Stack

# Frontend
- TypeScript
- Vanilla JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express
- TypeScript
- MSSQL (or your DB of choice)
- JWT for authentication
- RESTful API architecture

---

##  Trading Account Lifecycle

1. Purchase Phase  
   User selects an account type (e.g., $10K, $50K, $100K virtual capital) and completes the purchase.

2. Evaluation Phase  
   The user must meet the trading objectives:
   - Reach a profit target (e.g., 10%)
   - Avoid daily drawdown or max loss
   - Trade for a minimum number of days

3. Completion Phase 
   Once criteria are met (or failed), the account is marked as:
   - Passed→ Eligible for funded account (optional extension)
   - Failed → Can retry after cooldown

4. Restriction Rule 
    A user cannot buy another account until the current one is completed (pass/fail).

---

