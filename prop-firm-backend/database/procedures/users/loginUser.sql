CREATE PROCEDURE sp_LoginUser
    @email VARCHAR(50)
AS
BEGIN
    SELECT id, username, email, password, role 
    FROM Users 
    WHERE email = @email AND isActive = 1;
END;