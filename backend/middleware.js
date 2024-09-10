const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(403).json({
            msg: "Authentication Failed",
            tokenValid: false
        })

    const token = authHeader.split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({
                msg: "Authentication Failed",
                tokenValid: false
            })

        if (decoded.userId) {
            req.userId = decoded.userId
            next()
        }
    })
}

module.exports = authMiddleware