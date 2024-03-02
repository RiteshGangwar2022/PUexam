const express = require("express");
const router = express.Router();


const {Login,Signup,verifyOtp,Allassignment,Getpdf, AllSessions} = require("../controller/secrecy");

router.post("/login", Login);
router.post("/register", Signup);
router.post("/verifyOtp", verifyOtp);
router.get("/allassignment",Allassignment);
router.get("/pdf/:id",Getpdf);
router.get("/allsessions/", AllSessions)
module.exports = router;
