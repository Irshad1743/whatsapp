require("dotenv").config();
require("./db/conn");
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
    credentials: true,
  }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));


const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", userRoutes);

const messageRoute = require("./routes/messageRoutes");
app.use("/api/v1/chat", messageRoute);

app.get("/", (req, res) => {
    res.send("HELLO");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT no. ${PORT}`);
});
