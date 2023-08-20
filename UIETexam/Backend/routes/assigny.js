const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Assignment,AllExaminers} = require("../controller/assigny");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/allusers", AllExaminers);
router.post("/addassignment",Assignment);

module.exports = router;
