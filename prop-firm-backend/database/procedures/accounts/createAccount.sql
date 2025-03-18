CREATE PROCEDURE sp_CreateAccount
    @id UNIQUEIDENTIFIER,
    @userId UNIQUEIDENTIFIER,
    @type VARCHAR(10),
    @balance DECIMAL(15, 2)
AS
BEGIN
    INSERT INTO Accounts (id, userId, type, balance, isWithdrawable, isActive)
    VALUES (@id, @userId, @type, @balance, 0, 1);
    SELECT @id AS id;
END;