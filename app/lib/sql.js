class SQL {
    constructor(host, username, password, database) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.database = database;

        this.mysql = require('mysql');
        this.connection = null;
    }

    connect() {
        this.connection = this.mysql.createConnection({
            host: this.host,
            user: this.username,
            password: this.password
        });

        this.connection.connect(function(err) {
            if(err) throw err;
            console.log("MySQL connection was successful!");
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports = SQL;
