const { SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
      
        let token = req.get("authorization");

        if (token) {

            jwt.verify(token, SECRET, (err, decoded) => {
                if (err) {

                    return res.status(409).json({
                        success: false,
                        error: "INVALID_TOKEN"
                    });

                } else {

                    req.decoded = decoded;
                    next();

                }
            });

        } else {

            return res.status(409).json({
                success: false,
                error: "Access Denied! Unauthorized User"
            });
            
        }
    }

};
