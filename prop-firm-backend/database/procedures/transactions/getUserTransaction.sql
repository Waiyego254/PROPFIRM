CREATE PROCEDURE sp_GetUserTransactions
    @userId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT transactionId, userId, accountId, propAccountId, depositAmount, tradingBalance, title, purchaseDate
    FROM PropTransactions
    WHERE userId = @userId;
END;