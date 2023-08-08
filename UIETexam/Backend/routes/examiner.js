const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,AllExaminers} = require("../controller/examiner");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/allusers", AllExaminers);

module.exports = router;

