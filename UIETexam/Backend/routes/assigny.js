const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Assignment,AllExaminers,Allsubject,ExamList} = require("../controller/assigny");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.post("/addassignment",Assignment);
router.get("/getsubject",Allsubject);
router.get("/allexaminers/:id", AllExaminers);
router.get("/getexamList", ExamList);

module.exports = router;
