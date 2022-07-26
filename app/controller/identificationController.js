const SQL = require('../lib/sql');
require('dotenv').config();

module.exports = {
    /**
     * Register a new user ID, generate a unique
     * identification code and store them as tuple
     * to the database.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    registerId: async (req, res) => {
        let sql = new SQL(process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASS, process.env.SQL_DATABASE);
        sql.connect();
    }
}
