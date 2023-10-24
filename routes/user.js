const express = require("express");
const router = express.Router();

const {signup, login, getProfile, updateUser, logout, followUser} = require('../controller/user');
const aunthenticateJWT  = require("../middleware/authenticate.js");

router.post("/user/signup", signup);
router.post("/user/login" ,login);
router.get("/user/profile", aunthenticateJWT, getProfile);
router.patch("/user/update", aunthenticateJWT, updateUser);
router.get("/user/logout", aunthenticateJWT, logout);
router.patch("/user/followUser", aunthenticateJWT, followUser)

module.exports = router