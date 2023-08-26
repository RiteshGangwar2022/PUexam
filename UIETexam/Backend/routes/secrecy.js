const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp} = require("../controller/secrecy");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);

module.exports = router;
