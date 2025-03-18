-- Accounts table (add isActive)
CREATE TABLE Accounts (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UNIQUEIDENTIFIER NOT NULL,
    type VARCHAR(10) NOT NULL, -- 'demo' or 'live'
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    isWithdrawable BIT NOT NULL DEFAULT 0,
    isActive BIT NOT NULL DEFAULT 1, -- 1 = active, 0 = inactive
    createdAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);