const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Assignment,AllExaminers,Allsubject} = require("../controller/assigny");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.post("/addassignment",Assignment);
router.get("/getsubject",Allsubject);
router.get("/allexaminers/:id", AllExaminers);

module.exports = router;
