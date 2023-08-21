const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,GetAssignments,SingleAssignment} = require("../controller/examiner");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/assigmnets",GetAssignments);
router.get("/singleassigmnet/:id",SingleAssignment);

module.exports = router;

