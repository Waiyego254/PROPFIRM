CREATE PROCEDURE sp_GetAllUsers
AS
BEGIN
    SELECT id, username, email, role, isActive, createdAt
    FROM Users;
END;