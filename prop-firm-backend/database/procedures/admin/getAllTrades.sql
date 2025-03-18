CREATE PROCEDURE sp_GetAllTrades
AS
BEGIN
    SELECT t.id, t.accountId, t.amount, t.description, t.transactionDate, a.userId
    FROM Transactions t
    JOIN Accounts a ON t.accountId = a.id;
END;