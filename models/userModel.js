const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = process.env.KEYSECRET;

//name, email, password, phone, bio, ipDetails, tokens, timestamps, role
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists !!!"],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid !")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    ipDetails: {
        country: {type: String, required: true},
        latitude: {type: String},
        longitude: {type: String},
        ip: {type: String},
    },
    tokens: [
        {
            token: {
                type: String,
            },
        }
    ]

}, { timestamps: true });

//hashing passord
userSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

//generate token
userSchema.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, keysecret);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log("Error came while generating token in userModel.js");
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;