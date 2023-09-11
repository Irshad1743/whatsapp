const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");

//register user
exports.registerUser = async (req, res) => {
    try {
        const {name, email, password, phone, bio, country, latitude, longitude, ip} = req.body;

        if (!name || !email || !password || !phone || !bio) {
            res.status(422).json({ error: "Please fill out all the fields" });
        } else {
            const emailExists = await User.findOne({ email: email });
            if(emailExists) {
                res.status(422).json({ error: "Email already exists in our database" });
            } else {
                const data = new User({ name, email, password, phone, bio, ipDetails: {country, latitude, longitude, ip} });
                await data.save();
                res.status(201).json({ message: "User registered successfully" })   
            }
        }
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

//login user
exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const emailExists = await User.findOne({ email: email });
        if(emailExists) {
            console.log(emailExists);
            const matchedPassword = await bcrypt.compare(password, emailExists.password);
            if(matchedPassword) {
                const token = await emailExists.generateToken();
                res.cookie("tokenCookie", token, {expires: new Date( Date.now() + 1 * 24 * 60 * 60 * 1000 ), httpOnly: true });
                res.status(201).json({message: { token, emailExists, message: "User logged in successfully" }});
            } else {
                res.status(422).json({ error: "Password does not match" })
            }
        } else {
            res.status(422).json({ error: "Email does not exists in our database" })
        }
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

//logout user
exports.logoutuser = async (req, res) => {
    try {
        const token = req.token;

        await User.updateOne( {_id: req.id}, {$pull: {tokens: {token: token}}} );
        res.clearCookie("tokenCookie", {path: "/"});
        res.status(201).json({ message: "User logged out successfully." });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

//valid user
exports.validuser = async (req, res) => {
    try {
        const validUser = await User.findOne({ _id: req.id });
        res.status(201).json({ status: 201, validUser });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

//get all users
exports.getallusers = async (req, res) => {
    try {
        const {searchname} = req.body;
        console.log(searchname);
        if(searchname) {
            const result = await User.find({ role: "user", name: {$regex: searchname} }, { _id: 1, name: 1, email: 1 });
            res.status(201).json({ message: result });
        } else {
            const result = await User.find({ role: "user" }, { _id: 1, name: 1, email: 1 });
            res.status(201).json({ message: result });
        }
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}