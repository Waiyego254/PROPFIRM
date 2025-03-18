CREATE PROCEDURE sp_CreateTransaction
    @transactionId UNIQUEIDENTIFIER,
    @userId UNIQUEIDENTIFIER,
    @accountId UNIQUEIDENTIFIER,
    @propAccountId UNIQUEIDENTIFIER,
    @depositAmount DECIMAL(15, 2),
    @tradingBalance DECIMAL(15, 2),
    @title VARCHAR(50)
AS
BEGIN
    INSERT INTO PropTransactions (transactionId, userId, accountId, propAccountId, depositAmount, tradingBalance, title)
    VALUES (@transactionId, @userId, @accountId, @propAccountId, @depositAmount, @tradingBalance, @title);
    SELECT * FROM PropTransactions WHERE transactionId = @transactionId;
END;