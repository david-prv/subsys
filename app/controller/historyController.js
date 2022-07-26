const SQL = require('../lib/sql');
const crypto = require('crypto');
const dir = "../app/views";
require('dotenv').config();

module.exports =  {
    /**
     * Collect and deliver history
     * 
     * @param {*} req 
     * @param {*} res 
     */
    showHistory: async (req, res) => {
        let sql = new SQL(process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASS, process.env.SQL_DATABASE);
        sql.connect();

        sql.exec("SELECT * FROM history WHERE 1 ORDER BY timestamp DESC;", function(err, rows) {
            sql.disconnect();
            if(err) {
                res.send("Could not load history.");
            } else {
                res.render(dir + '/history', {nonce: res.app.locals._nonce, data: rows});
            }
        });
    }
}