CREATE TABLE TradeTransactions (
    tradeId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    accountId UNIQUEIDENTIFIER NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tradeDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (accountId) REFERENCES Accounts(id)
);

SELECT * FROM TradeTransactions;