CREATE PROCEDURE sp_CreatePropAccount
    @id UNIQUEIDENTIFIER,
    @title VARCHAR(50),
    @tradingBalance DECIMAL(15, 2),
    @challengeFee DECIMAL(15, 2)
AS
BEGIN
    INSERT INTO PropAccounts (id, title, tradingBalance, challengeFee)
    VALUES (@id, @title, @tradingBalance, @challengeFee);
    SELECT * FROM PropAccounts WHERE id = @id;
END;