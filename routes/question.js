const express =  require("express")
const  { newQuestion , showAllQuestions, updateQuestion, uploadFile, likeQuestion, dislikeQuestion, deleteQuestion, filterByCategory } = require("../controller/question");
const aunthenticateJWT  =  require("../middleware/authenticate");
const fileUpload  = require("../middleware/multer.js");
const router = express.Router();

router.post("/question/new" , aunthenticateJWT, newQuestion);
router.get("/question/show" , aunthenticateJWT, showAllQuestions);
router.patch("/question/update", aunthenticateJWT, updateQuestion);
router.post("/question/addPicture", aunthenticateJWT, fileUpload.uploadServer.array("file"), uploadFile);
router.patch("/question/likeQuestion", aunthenticateJWT, likeQuestion);
router.patch("/question/dislikeQuestion", aunthenticateJWT, dislikeQuestion);
router.get("/question/filter" , aunthenticateJWT, filterByCategory);
router.delete("/question/delete", aunthenticateJWT, deleteQuestion);

module.exports =  router;