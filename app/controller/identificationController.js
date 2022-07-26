const SQL = require('../lib/sql');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
    /**
     * Register a new user ID, generate a unique
     * identification code and store them
     * to the database.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    registerId: async (req, res) => {
        let sql = new SQL(process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASS, process.env.SQL_DATABASE);
        sql.connect();

        let email = sql.serialize(req.body.email);
        let alias = sql.serialize(req.body.alias);
        let secret = crypto.createHash('sha1').update(sql.serialize(req.body.secret)).digest('hex');

        let nonce = crypto.randomBytes(16).toString('base64');
        let submissionId = crypto.createHash('sha1').update(`${email}|${alias}|${secret}|${nonce}`).digest('hex');

        await sql.exec(`INSERT INTO members (submission_id, email, alias, secret, score) VALUES ('${submissionId}', '${email}', '${alias}', '${secret}', 0);`, function(err, rows) {
            sql.disconnect();
            if(err) res.status(500).send("error");
            else res.status(200).send(submissionId);
        });
    }
}