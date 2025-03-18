CREATE PROCEDURE sp_RegisterUser
    @id UNIQUEIDENTIFIER,
    @username VARCHAR(50),
    @password VARCHAR(255),
    @email VARCHAR(100)
AS
BEGIN
    INSERT INTO Users (id, username, password, email) -- role defaults to 'user'
    VALUES (@id, @username, @password, @email);
    SELECT @id AS id;
END;