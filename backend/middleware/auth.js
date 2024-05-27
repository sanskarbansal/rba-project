// middleware/auth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const _user = (user = await User.findById(user.userId));
        if (!_user) return res.sendStatus(401);
        req.user = _user;
        next();
    });
};

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
