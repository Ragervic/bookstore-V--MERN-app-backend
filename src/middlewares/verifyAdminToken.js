const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY


const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)
    if (!token) {
        res.status(401).send({ message: "Access Denied!!No token provided!" })
    }
    JWT.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).send({ message: "Invalid token!!" })
        }
        req.user = user;
        next();
    })

}


module.exports = verifyAdminToken;