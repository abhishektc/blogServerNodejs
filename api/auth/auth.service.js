const { database } = require("../../config/config");

module.exports = {
    checkUserExist: (data, callback) => {
        database.query(`select EXISTS(select * from authUser where username=$1) as exists`,
            [data.username],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },


    registerNewUser: (data, callback) => {
        database.query(`insert into authUser(username, password) 
        values($1,$2) RETURNING userid, username`,
            [data.username, data.password],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results.rows[0]);
            }
        );
    },

    getUser: (data, callback) => {
        database.query(`select * from authUser where username=$1`,
            [data.username],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results.rows[0]);
            }
        );
    },

};