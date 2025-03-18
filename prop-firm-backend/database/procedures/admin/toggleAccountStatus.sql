CREATE PROCEDURE sp_ToggleAccountStatus
    @accountId UNIQUEIDENTIFIER,
    @isActive BIT
AS
BEGIN
    UPDATE Accounts
    SET isActive = @isActive
    WHERE id = @accountId;
END;