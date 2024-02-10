const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Assignment,AllExaminers,Allsubject,ExamList, AllSubjectProfessors,getProfessorDetail} = require("../controller/assigny");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.post("/addassignment",Assignment);
router.get("/getsubject",Allsubject);
router.get("/allexaminers/:id", AllExaminers);
router.get("/getexamList", ExamList);
router.get("/allprofessors/:SubjectCode", AllSubjectProfessors)
router.get("/getProfessor/:id",getProfessorDetail)

module.exports = router;
