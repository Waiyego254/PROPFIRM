CREATE PROCEDURE sp_ChangeUserRole
    @userId UNIQUEIDENTIFIER,
    @role VARCHAR(10)
AS
BEGIN
    UPDATE Users
    SET role = @role
    WHERE id = @userId;
    SELECT id, username, email, role FROM Users WHERE id = @userId;
END;