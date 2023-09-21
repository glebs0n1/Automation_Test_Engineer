window.players = {
    rows: {
        current: null,
        rows: [],
        getRow: function(whereKey = '') {

        },
        updateRow: function(serverName, whereKey, updatedData) {
            const data = players.rows.rows[serverName];

            if (data) {
                const userIndex = data.findIndex(user => user.key === whereKey);

                if (userIndex !== -1) {
                    const user = data[userIndex];
                    for (const key in updatedData) {
                        if (user.hasOwnProperty(key)) {
                            user[key] = updatedData[key];
                        }
                    }

                    console.log(`User data updated for user ${whereKey} on server ${serverName}:`, data[userIndex]);
                } else {
                    console.error(`User with key ${whereKey} not found on server ${serverName}`);
                }
            } else {
                console.error(`User data not found for the server ${serverName}`);
            }
        },
        deleteRow: function(whereKey = '') {}
    },
    fetch: async function(serverName) {
        try {
            const data = await window.requests.get(`/data/${serverName}/players.json`);
            if (data) {
                players.rows.rows[serverName] = data;
                console.log(`User data retrieved for the server ${serverName}`);
            } else {
                console.error(`Failed to retrieve user data for the server ${serverName}`);
            }
        } catch (error) {
            console.error(`An error occurred while retrieving user data for the server ${serverName}: ${error}`);
        }
    },
    getUsers: async function(serverNames) {
        for (const serverName of serverNames) {
            try {
                const data = await window.requests.get(serverName, 'players.json');
                console.log(`Data from ${serverName}:`, data);
                if (data) {
                    players.rows.rows[serverName] = data;
                    console.log(`User data successfully retrieved for the server ${serverName}`);

                    const updatedData = {
                        device_os: "ios",
                        login: "ios_user_111",
                        name: "User 111",
                        status: "active",
                        level: 42,
                        coins: 1000
                    };
                    players.rows.updateRow("production", "12345", updatedData);
                } else {
                    console.error(`Failed to load user data from the server ${serverName}`);
                }
            } catch (error) {
                console.error(`An error occurred while retrieving user data for the server ${serverName}: ${error}`);
            }
        }
    },
    getActiveUsers: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const activeUsers = data.filter(user => user.status === 'active');
                console.log(`Active users on the server ${serverName}:`, activeUsers);
            } else {
                window.logssystem.error(`User data not found for the server ${serverName}`);
            }
        });
    },
    getBannedUsers: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const bannedUsers = data.filter(user => user.status === 'banned');
                console.log(`Blocked users on the server ${serverName}:`, bannedUsers);
            } else {
                window.logssystem.error(`User data not found for the server ${serverName}`);
            }
        });
    },
    getUsersWithNegativeCoins: function(serverNames) {
        const usersWithNegativeCoins = [];

        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const negativeCoinsUsers = data.filter(user => user.coins < 0);
                usersWithNegativeCoins.push(...negativeCoinsUsers);
                console.log(`Users with negative balance on the server ${serverName}:`, negativeCoinsUsers);
            } else {
                window.logssystem.error(`User data not found for the server ${serverName}`);
            }
        });

        return usersWithNegativeCoins;
    },

    getUsersWithNegativeBalance: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const negativeBalanceUsers = data.filter(user => user.coins < 0);
                console.log(`Users with negative balance on the server ${serverName}:`, negativeBalanceUsers);

                negativeBalanceUsers.forEach(user => {
                    user.coins = 0;

                });

                console.log(`Balance set to 0 for users with negative balance on the server ${serverName}`);
            } else {
                window.logssystem.error(`User data not found for the server ${serverName}`);
            }
        });
    }
};