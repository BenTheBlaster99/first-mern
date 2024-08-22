const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "")
    if (!token) {
        return res.status(401).json({message: "no token, no entery, yes token , welcome in :D"})
    }
    try {
        const decoded_token = jwt.verify(token, "secret-key");
        req.user = decoded_token;
        next()
    } catch (error) {
        res.status(401).json({message:"invalid token"})
    }
}
module.exports = authentication