const express = require("express");
const router = express.Router();

const {signup, login, getProfile, updateUser, followUser, uploadProfilePic, logout} = require('../controller/user');
const authenticateJWT  = require("../middleware/authenticate.js");
const fileUpload  = require("../middleware/multer.js");


router.post("/user/signup", signup);
router.post("/user/login" ,login);
router.get("/user/profile", authenticateJWT, getProfile);
router.patch("/user/update", authenticateJWT, updateUser);
router.get("/user/logout", authenticateJWT, logout);
router.patch("/user/followUser", authenticateJWT, followUser);
router.post("/user/profilepic", authenticateJWT, fileUpload.uploadCloudinary.single("file"), uploadProfilePic);

module.exports = router