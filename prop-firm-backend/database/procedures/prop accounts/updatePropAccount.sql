CREATE PROCEDURE sp_UpdatePropAccount
    @id UNIQUEIDENTIFIER,
    @title VARCHAR(50),
    @tradingBalance DECIMAL(15, 2),
    @challengeFee DECIMAL(15, 2)
AS
BEGIN
    UPDATE PropAccounts
    SET title = @title,
        tradingBalance = @tradingBalance,
        challengeFee = @challengeFee,
        updatedAt = GETDATE()
    WHERE id = @id;
    SELECT * FROM PropAccounts WHERE id = @id;
END;