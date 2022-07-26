const SQL = require('../lib/sql');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
    checkForGift: async(req, res) => {
        res.send("ok");
    },
    /**
     * Credit Flag subroutine. Checks if user was valid,
     * increases score and pushes new event to history.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    creditFlag: async (req, res, next) => {
        let sql = new SQL(process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASS, process.env.SQL_DATABASE);
        sql.connect();

        let id = sql.serialize(req.body.id);
        let flag = crypto.createHash('sha1').update(req.body.flag).digest('hex');

        
        sql.exec(`SELECT * FROM members WHERE submission_id = '${id}';`, function(err, rows) {
            if(err || !rows || rows.length == 0) {
                sql.disconnect();
                res.status(500).send("error: member not found");
            } else {
                sql.exec(`UPDATE members SET score = score + 1 WHERE submission_id = '${id}';`, function(err, rows) {
                    if(err) {
                        sql.disconnect();
                        res.status(500).send("error: could not increase score");
                    } else {
                        sql.exec(`INSERT INTO history (timestamp, member_id, flag_hash) VALUES (NULL, '${id}', '${flag}');`, function(err, rows) {
                            sql.disconnect();
                            if(err) res.status(500).send("error: could not push history event");
                            else next();
                        });
                    }
                });
            }
        });
        
    },
    /**
     * Check if flag is valid. If yes,
     * credit flag for user and invalide flag for
     * submitting identification code.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    submitFlag:  async (req, res, next)=> {
        let sql = new SQL(process.env.SQL_HOST, process.env.SQL_USER, process.env.SQL_PASS, process.env.SQL_DATABASE);
        sql.connect();

        let id = sql.serialize(req.body.id);
        let flag = crypto.createHash('sha1').update(req.body.flag).digest('hex');

        await sql.exec(`SELECT * FROM flags WHERE flag_hash = '${flag}'`, function(err, rows) {
            if(err || !rows || rows.length == 0) {
                sql.disconnect();
                res.status(500).send("error: flag was not found");
                return;
            } else {
                sql.exec(`SELECT * FROM history WHERE member_id = '${id}' AND flag_hash = '${flag}';`, function(err, rows) {
                    sql.disconnect();
                    if(rows && rows.length > 0) {
                        res.status(500).send("error: already submitted");
                    } else {
                        if(err) res.status(500).send("error: could not interact with history");
                        else next();
                    }
                });
            }
        });
    }
};
