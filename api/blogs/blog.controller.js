const { createBlogs, blogLists, myBlogList, deleteMyBlogById, updateBlogById } = require("./blog.service");

module.exports = {
    createBlog: (req, res) => {

        const body = req.body;
        body.addedDate = new Date();
        body.username = req.decoded.username;

        createBlogs(body, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Created blog successfully."
            });

        });
    },

    blogList: (req, res) => {

        blogLists((err, results) => {
            
            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            return res.status(200).json({
                data: results
            });

        });
    },

    myBlog: (req, res) => {

        const username = req.decoded.username;

        myBlogList(username, (err, results) => {

            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            return res.status(200).json({
                data: results
            });

        });
    },

    deleteMyBlog: (req, res) => {

        const username = req.decoded.username;
        const body = {
            blogId: req.params.id,
            username: username
        }

        deleteMyBlogById(body, (err, results) => {

            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            return res.status(200).json({
                message: "Deleted blog successfully."
            });

        });
    },

    updateBlog: (req, res) => {

        const username = req.decoded.username;
        const body = {
            blogId: req.params.id,
            username: username,
            title: req.body.title,
            content: req.body.content,
            updateDate: new Date()
        };

        updateBlogById(body, (err, results) => {

            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            return res.status(200).json({
                message: "Updated blog successfully."
            });

        });
    },

};