-- PurchasedAccounts table (no change)
CREATE TABLE PurchasedAccounts (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    accountId UNIQUEIDENTIFIER NOT NULL,
    depositAmount DECIMAL(15, 2) NOT NULL,
    tradingBalance DECIMAL(15, 2) NOT NULL,
    purchaseDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (accountId) REFERENCES Accounts(id)
);