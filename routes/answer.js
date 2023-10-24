const express =  require("express")
const  { newAnswer , showAllAnswers, updateAnswer, likeAnswer, dislikeAnswer, deleteAnswer } = require("../controller/answer");
const aunthenticateJWT  =  require("../middleware/authenticate");
const router = express.Router();

router.post("/answer/new" , aunthenticateJWT, newAnswer);
router.get("/answer/show" , aunthenticateJWT, showAllAnswers);
router.patch("/answer/update", aunthenticateJWT, updateAnswer);
router.patch("/answer/like", aunthenticateJWT, likeAnswer);
router.patch("/answer/dislike", aunthenticateJWT, dislikeAnswer);
router.delete("/answer/delete", aunthenticateJWT, deleteAnswer);

module.exports =  router;