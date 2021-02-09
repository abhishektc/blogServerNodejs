const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require('../../config/config')
const { checkUserExist, registerNewUser, getUser } = require("./auth.service");

module.exports = {
    register: (req, res) => {
        
        const body = req.body;

        checkUserExist(body, async (err, results) => {

            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }
            if (results.rows[0].exists) {

                return res.status(409).json({
                    success: true,
                    error: "USERNAME_EXISTS"
                });

            } else {

                body.password = await bcrypt.hash(body.password, 12);

                registerNewUser(body, async (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Database connection errror"
                        });
                    }

                    const decodedResult = await getTokenResult(result);

                    return res.status(200).json({
                        userId: decodedResult.userId,
                        username: decodedResult.username,
                        token: decodedResult.token,
                        expiresIn: decodedResult.expiresIn
                    });
                });
            }
        });
    },

    login: (req, res) => {

        const body = req.body;
        getUser(body, async (err, results) => {

            if (!!err) {
                return res.status(500).json({
                    success: false,
                    message: "Database connection errror"
                });
            }

            if (!results) {
                return res.status(409).json({
                    success: false,
                    error: "USERNAME_NOT_FOUND"
                });
            }

            let isMatch = await bcrypt.compare(body.password, results.password);

            if (isMatch) {

                const decodedResult = await getTokenResult(results);

                return res.status(200).json({
                    userId: decodedResult.userId,
                    username: decodedResult.username,
                    token: decodedResult.token,
                    expiresIn: decodedResult.expiresIn
                });

            } else {

                return res.status(403).json({
                    error: "INVALID_PASSWORD",
                    success: false
                });

            }

        });
    },



};

const getTokenResult = (result) => {

    let token = jwt.sign(
        {
            userId: result.userid,
            username: result.username,
        },
        SECRET,
        { expiresIn: "5h" }
    );

    const decodeToken = jwt.decode(token);

    return {
        userId: result.userid,
        username: result.username,
        token: token,
        expiresIn: decodeToken.exp
    };
}