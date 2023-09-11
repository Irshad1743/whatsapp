const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const keysecret = process.env.KEYSECRET;

//auth user
exports.isAuthUser = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
       if(!token) {
            return res.status(422).json({ error: "Token not found in auth.js" })
        }

        const verifyToken = jwt.verify(token, keysecret);

        const userData = await User.findOne({ _id: verifyToken._id });
        if(!userData) {
            return res.status(422).json({ error: "User not found in auth.js" });
        }
        
        req.token = token;
        req.id = verifyToken._id;
        req.userData = userData;
        
        next();
    } catch (err) {
        res.status(422).json({ error: err.message }); //Unauthorized no token provided
    }
}

//roles user
exports.isAuthRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (roles.includes(req.userData.role)) {
                next();
            } else {
                res.status(422).json({ error: `Role: ${req.userData.role} is not allowed to access this page` });
            }
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
    }
}

