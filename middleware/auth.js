const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"]; // x-access-token is the key for the token in the header

    if(!token){
        return res.status(403).send("A token is required for authentication"); // 403 is forbidden
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY); // config.TOKEN_KEY is the secret key
        req.user = decoded;
    } catch (err){
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;