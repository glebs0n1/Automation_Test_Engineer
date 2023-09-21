window.players = {
    rows: {
        current: null,
        rows: [],
        getRow: function(whereKey = '') {

        },
        updateRows: function(serverName, newData = []) {
            if (!players.rows.rows[serverName]) {
                players.rows.rows[serverName] = [];
            }

            newData.forEach(user => {
                const existingUserIndex = players.rows.rows[serverName].findIndex(u => u.key === user.key);

                if (existingUserIndex !== -1) {
                    players.rows.rows[serverName][existingUserIndex] = {...players.rows.rows[serverName][existingUserIndex], ...user };
                } else {
                    players.rows.rows[serverName].push(user);
                }
            });
        },
        deleteRow: function(whereKey = '') {}
    },
    fetch: async function(serverName) {
        try {
            const data = await window.requests.get(`/data/${serverName}/players.json`);
            if (data) {
                players.rows.rows[serverName] = data;
                window.logssystem.log(`Данные пользователей получены для сервера ${serverName}`);
            } else {
                window.logssystem.error(`Не удалось получить данные пользователей для сервера ${serverName}`);
            }
        } catch (error) {
            window.logssystem.error(`Произошла ошибка при получении данных пользователей для сервера ${serverName}: ${error}`);
        }
    },
    getUsers: async function(serverNames) {
        for (const serverName of serverNames) {
            try {
                const data = await window.requests.get(serverName, 'players.json');
                console.log(`Data from ${serverName}:`, data); // Выводим данные в консоль
                if (data) {
                    players.rows.rows[serverName] = data;
                    window.logssystem.log(`Данные пользователей успешно получены для сервера ${serverName}`);
                } else {
                    window.logssystem.error(`Не удалось загрузить данные пользователей с сервера ${serverName}`);
                }
            } catch (error) {
                window.logssystem.error(`Произошла ошибка при получении данных пользователей для сервера ${serverName}: ${error}`);
            }
        }
    },

    getActiveUsers: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const activeUsers = data.filter(user => user.status === 'active');
                window.logssystem.log(`Активные пользователи на сервере ${serverName}:`, activeUsers);
            } else {
                window.logssystem.error(`Данные о пользователях не найдены для сервера ${serverName}`);
            }
        });
    },
    getBannedUsers: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const bannedUsers = data.filter(user => user.status === 'banned');
                window.logssystem.log(`Заблокированные пользователи на сервере ${serverName}:`, bannedUsers);
            } else {
                window.logssystem.error(`Данные о пользователях не найдены для сервера ${serverName}`);
            }
        });
    },
    getUsersWithNegativeBalance: function(serverNames) {
        serverNames.forEach(serverName => {
            const data = players.rows.rows[serverName];

            if (data) {
                const negativeBalanceUsers = data.filter(user => user.coins < 0);
                window.logssystem.log(`Пользователи с отрицательным балансом на сервере ${serverName}:`, negativeBalanceUsers);

                negativeBalanceUsers.forEach(user => {
                    user.coins = 0;

                });

                window.logssystem.log(`Баланс установлен в 0 для пользователей с отрицательным балансом на сервере ${serverName}`);
            } else {
                window.logssystem.error(`Данные о пользователях не найдены для сервера ${serverName}`);
            }
        });
    }
};