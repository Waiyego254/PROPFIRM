CREATE PROCEDURE sp_SimulateTrade
    @tradeId UNIQUEIDENTIFIER,
    @transactionId UNIQUEIDENTIFIER, -- Add transactionId to target specific purchase
    @accountId UNIQUEIDENTIFIER,
    @amount DECIMAL(15, 2),
    @description VARCHAR(255)
AS
BEGIN
    BEGIN TRANSACTION;
    DECLARE @currentBalance DECIMAL(15, 2);

    -- Get the tradingBalance for the specific PropTransactions row
    SELECT @currentBalance = tradingBalance 
    FROM PropTransactions 
    WHERE transactionId = @transactionId AND accountId = @accountId;

    IF @currentBalance IS NULL
    BEGIN
        ROLLBACK;
        THROW 50002, 'No prop transaction found for this account and transaction', 1;
    END
    ELSE IF @currentBalance + @amount < 0 -- Amount is negative
    BEGIN
        ROLLBACK;
        THROW 50001, 'Insufficient trading balance for trade', 1;
    END
    ELSE
    BEGIN
        -- Update the specific PropTransactions row
        UPDATE PropTransactions 
        SET tradingBalance = @currentBalance + @amount
        WHERE transactionId = @transactionId AND accountId = @accountId;

        -- Insert trade record into TradeTransactions
        INSERT INTO TradeTransactions (tradeId, accountId, amount, description, tradeDate)
        VALUES (@tradeId, @accountId, @amount, @description, GETDATE());

        COMMIT;
        SELECT * FROM TradeTransactions WHERE tradeId = @tradeId;
    END
END;