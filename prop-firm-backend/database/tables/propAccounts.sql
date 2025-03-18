CREATE TABLE PropAccounts (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(50) NOT NULL, -- e.g., "Beginner", "Intermediate"
    tradingBalance DECIMAL(15, 2) NOT NULL, -- e.g., 5000, 10000
    challengeFee DECIMAL(15, 2) NOT NULL, -- e.g., 49, 129
    profitTargetPhase1 DECIMAL(5, 2) NOT NULL DEFAULT 10.00, -- 10%
    profitTargetPhase2 DECIMAL(5, 2) NOT NULL DEFAULT 7.50, -- 7.5%
    dailyLossLimit DECIMAL(5, 2) NOT NULL DEFAULT 5.00, -- 5%
    maxTrailingDrawdown DECIMAL(5, 2) NOT NULL DEFAULT 10.00, -- 10%
    minTradingDays INT NOT NULL DEFAULT 5,
    leverageMax VARCHAR(10) NOT NULL DEFAULT '200:1',
    reEntryAllowed VARCHAR(20) NOT NULL DEFAULT 'Yes at 50% of Fee',
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

SELECT * FROM PropAccounts;

DELETE FROM PropAccounts;