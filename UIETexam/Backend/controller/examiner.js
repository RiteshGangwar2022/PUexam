const mongoose = require("mongoose");
const Professor = require("../Database/Models/Professor");
const bcrpt = require("bcrypt");

const { hashPassword } = require("../utils/bycrpt");
const { sendOtpEmail } = require("../utils/mailer");
const { otpModel } = require("../Database/Models/Otp");

//implementing two factor authentication(using password, second=>using OTP verification)
const Login = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    //console.log(req.body);

    if (!email || !role || !password) {
      res.status(422).json({ error: "enter details properly" });
    }
    const professordata = await Professor.findOne({ email: email });

    if (professordata) {
      const ismatch = await bcrpt.compare(password, professordata.password);

      const checkrole = professordata.role == role;
      // console.log(checkrole)
      if (!ismatch) {
        res.status(422).json({ message: "invalid credential" });
      } else if (checkrole != true) {
        res.status(422).json({ message: "invalid role" });
      } else {
        //after user successfully, enter right password and email,
        //we will send an otp on his email to again verify user

        //it will send otp to user
        const sendCode = await sendOtpEmail(req.body.email, professordata._id);

        res.status(200).json(professordata);
        //console.log(admindata)
      }
    } else {
      res.status(422).json({ message: "invalid credential" });
    }
  } catch (err) {
    res.status(422).json(err);
  }
};

const Signup = async (req, res) => {
  try {
    const { name, email, mobile, gender, department, role, password } =
      req.body;

    const hash = await hashPassword(req.body.password);
    const newprofessor = new Professor({
      name,
      email,
      mobile,
      gender,
      department,
      role,
      password: hash,
    });
    const data = await newprofessor.save();
    console.log(data);
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const userId = req.body.id;
    const body_otp = req.body.otp;

    if (!userId && !body_otp) {
      return res.status(500).json({
        status: "failure",
        message: "Empty otp is not allowed",
      });
    }

    //comparing otp with the saved otp in our database
    const userOtpRecords = await otpModel
      .find({ entityId: userId })
      .sort({ createdAt: -1 });

    if (userOtpRecords.length < 0) {
      res.status(500).json({
        status: "failure",
        message: "Account Record doesnt exist . Please login or signin",
      });
    }

    const otp = userOtpRecords[0].otp;
    const validOtp = await bcrpt.compare(body_otp, otp);

    if (!validOtp) {
      return res.status(500).json({
        status: "failure",
        message: "Invalid OTP",
      });
    }

    //to delete otp from database
    await otpModel.deleteMany({ _id: userId });

    return res.status(200).json({
      status: "success",
      message: "User is verified",
    });
  } catch (error) {
    console.log(error);
  }
};

const AllExaminers = async (req, res) => {

  try {

    const data = await Professor.find({});
    //console.log(data);
    res.status(200).json(data);
    
  } catch (err) {

    res.status(422).json(err);

  }
};

module.exports = { Login, Signup, verifyOtp, AllExaminers };
