const express = require("express");
const router = express.Router();
const {isAuthUser, isAuthRoles} = require("./../middleware/auth");
const {registerUser, loginUser, logoutuser, validuser, getallusers} = require("./../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthUser, isAuthRoles("user"), logoutuser);
router.get("/validuser", isAuthUser, validuser);
router.post("/getallusers", isAuthUser, isAuthRoles("user"), getallusers);

module.exports = router;