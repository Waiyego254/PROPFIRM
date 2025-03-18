CREATE PROCEDURE sp_PurchaseAccount
    @id UNIQUEIDENTIFIER,
    @accountId UNIQUEIDENTIFIER,
    @depositAmount DECIMAL(15, 2),
    @tradingBalance DECIMAL(15, 2)
AS
BEGIN
    INSERT INTO PurchasedAccounts (id, accountId, depositAmount, tradingBalance)
    VALUES (@id, @accountId, @depositAmount, @tradingBalance);
    UPDATE Accounts SET balance = @tradingBalance WHERE id = @accountId;
END;