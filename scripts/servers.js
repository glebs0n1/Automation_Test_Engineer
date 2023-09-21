window.servers = {
    rows: {
        available: [],
        current: "production",
        rows: {
            production: {
                url: "/data/production/",
                name: "Production Server",
                status: "enabled"
            },
            staging: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "enabled"
            },
            dev: {
                url: "/data/staging/",
                name: "Staging Server",
                status: "disabled"
            }
        },
        getRow: function(whereKey = '') {

        },
        updateRow: function(object) {

        },
        deleteRow: function(whereKey = '') {

        }
    },
    getAvailableServers: function() {
        const serverKeys = Object.keys(this.rows.rows);
        const enabledServers = serverKeys.filter(key => this.rows.rows[key].status === 'enabled');
        this.rows.available = enabledServers;
        window.logssystem.log('getAvailableServers loaded data for servers:', enabledServers);
        return enabledServers;
    }
}