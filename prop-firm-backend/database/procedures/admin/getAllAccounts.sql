CREATE PROCEDURE sp_GetAllAccounts
AS
BEGIN
    SELECT a.id, a.userId, a.type, a.balance, a.isActive, a.createdAt, pa.depositAmount, pa.tradingBalance
    FROM Accounts a
    LEFT JOIN PurchasedAccounts pa ON a.id = pa.accountId;
END;