const { database } = require("../../config/config");

module.exports = {
    createBlogs: (data, callback) => {
        database.query(`insert into blog(username, title, content, addeddate, updatedate) 
        values($1,$2, $3, $4, $5)`,
            [data.username, data.title, data.content, data.addedDate, data.addedDate],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },


    blogLists: callback => {
        database.query(`SELECT * FROM blog ORDER BY updatedate DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results.rows);
            }
        );
    },

    myBlogList: (data, callback) => {
        database.query(`select * from blog where username = $1 order by updatedate DESC`,
            [data],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results.rows);
            }
        );
    },

    deleteMyBlogById: (data, callback) => {
        database.query(`delete from blog where username = $1 AND blogid = $2`,
            [data.username, data.blogId],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updateBlogById: (data, callback) => {
        database.query(`update blog set title = $1, content = $2, updatedate = $3 where username = $4 and blogid = $5`,
            [data.title, data.content, data.updateDate, data.username, data.blogId],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },

};