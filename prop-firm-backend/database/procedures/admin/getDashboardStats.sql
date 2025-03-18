CREATE PROCEDURE sp_GetDashboardStats
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM Users WHERE isActive = 1) AS totalActiveUsers,
        (SELECT COUNT(*) FROM Accounts WHERE type = 'demo' AND isActive = 1) AS totalDemoAccounts,
        (SELECT COUNT(*) FROM Accounts WHERE type = 'live' AND isActive = 1) AS totalLiveAccounts,
        (SELECT SUM(balance) FROM Accounts WHERE type = 'live' AND isActive = 1) AS totalLiveBalance,
        (SELECT COUNT(*) FROM Transactions) AS totalTrades,
        (SELECT SUM(ABS(amount)) FROM Transactions) AS totalTradeAmount;
END;