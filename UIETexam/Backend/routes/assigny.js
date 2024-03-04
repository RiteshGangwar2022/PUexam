const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Assignment,AllExaminers,Allsubject,ExamList, AllSubjectProfessors,getProfessorDetail,SingleAssignment,SingleAssignment2} = require("../controller/assigny");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.post("/addassignment",Assignment);
router.get("/getsubject",Allsubject);
router.get("/allexaminers/:id", AllExaminers);
router.get("/getexamList", ExamList);
router.get("/allprofessors/:SubjectCode", AllSubjectProfessors)
router.get("/getProfessor/:id",getProfessorDetail);
router.get("/singleassignment/:id1/:id2", SingleAssignment);
router.get("/singleassignment2/:id1/:id2/:id3/:id4", SingleAssignment2);

module.exports = router;
