class SQL {
    /**
     * Constructor
     * 
     * @param {string} host 
     * @param {string} username 
     * @param {string} password 
     * @param {string} database 
     */
    constructor(host, username, password, database) {
        this.host = host;
        this.username = username;
        this.password = password;
        this.database = database;

        this.mysql = require('mysql');
        this.escape = require('sql-escape');
        this.connection = null;
    }

    /**
     * Open stateful connection
     */
    connect() {
        this.connection = this.mysql.createConnection({
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database
        });

        this.connection.connect(function(err) {
            if(err) throw err;
        });
    }

    /**
     * Close connection
     */
    disconnect() {
        this.connection.end();
    }

    /**
     * 
     * @param {string} string 
     * @returns
     */
    serialize(string) {
        if(typeof string !== "string") return null;
        return this.escape(string);
    }

    /**
     * 
     * @param {string} query 
     * @param {function} callback 
     * @returns 
     */
    async exec(query, callback) {
        if(typeof query !== "string" || typeof callback !== "function") return null;
        return await this.connection.query(query, callback);
    }
}

module.exports = SQL;
