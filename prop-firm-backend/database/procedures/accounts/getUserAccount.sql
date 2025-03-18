CREATE PROCEDURE sp_GetUserAccounts
    @userId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT a.id, a.type, a.balance, a.createdAt, a.isActive, pa.depositAmount, pa.tradingBalance
    FROM Accounts a
    LEFT JOIN PurchasedAccounts pa ON a.id = pa.accountId
    WHERE a.userId = @userId;
END;