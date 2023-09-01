const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Getpdf} = require("../controller/secrecy");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/pdf/:key",Getpdf);
module.exports = router;
