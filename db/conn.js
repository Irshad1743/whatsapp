const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("Database Connection Successfully");
    })
    .catch((err) => {
        console.log("No Connection");
    })