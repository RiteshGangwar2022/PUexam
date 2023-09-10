const mongoose = require("mongoose");
const Assigny = require("../Database/Models/Assigny");
const bcrpt = require("bcrypt");

const { hashPassword } = require("../utils/bycrpt");
const { sendOtpEmail } = require("../utils/mailer");
const { otpModel } = require("../Database/Models/Otp");
const Exam = require("../Database/Models/Exam");
const Subject = require("../Database/Models/Subject");
const Professor = require("../Database/Models/Professor");
const Subjectassign = require("../Database/Models/Subjectassign");

//implementing two factor authentication(using password, second=>using OTP verification)
const Login = async (req, res) => {
  try {
    const { email, role, password } = req.body;
    //console.log(req.body);

    if (!email || !role || !password) {
      res.status(422).json({ error: "enter details properly" });
    }
    const assignydata = await Assigny.findOne({ email: email });

    if (assignydata) {
      const ismatch = await bcrpt.compare(password, assignydata.password);

      const checkrole = assignydata.role == role;

      if (!ismatch) {
        res.status(422).json({ message: "invalid credential" });
      } else if (checkrole != true) {
        res.status(422).json({ message: "invalid role" });
      } else {
        //after user successfully, enter right password and email,
        //we will send an otp on his email to again verify user

        //it will send otp to user
        const sendCode = await sendOtpEmail(req.body.email, assignydata._id);

        res.status(200).json(assignydata);
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
    const { name, email, mobile, gender, role, password } = req.body;

    const hash = await hashPassword(req.body.password);
    const newassigny = new Assigny({
      name,
      email,
      mobile,
      gender,
      role,
      password: hash,
    });
    const data = await newassigny.save();
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
    console.log(userOtpRecords);
    const otp = userOtpRecords[userOtpRecords.length - 1].otp;
    const validOtp = await bcrpt.compare(body_otp, otp);
    /* console.log(body_otp);
     console.log(otp);
     console.log(validOtp); 
    */
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

const Assignment = async (req, res) => {
  const { DOE, ExamCode, Branch, SemesterNo, Examiners, Subject } = req.body;
  if (!DOE || !ExamCode || !Branch || !SemesterNo || !Examiners || !Subject) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  //console.log(req.body);

  var users = JSON.parse(req.body.Examiners);
  var sub = JSON.parse(req.body.Subject);

  try {
    const newExam = new Exam({
      DOE,
      ExamCode,
      Branch,
      SemesterNo,
      Examiners: users,
      Subject: sub,
      Pdfkey:""
    });

    //console.log(newExam);

    const data = await newExam.save();

    const Assignment = await Exam.findOne({ _id: data._id })
      .populate("Examiners", "-password")
      .populate("Subject");
    //console.log(Assignment);

    res.status(200).json(Assignment);
  } catch (error) {
     //console.log(error);
    res.status(400).json(error);
  }
};

const Allsubject = async (req, res) => {
  try {
    const data = await Subject.find({});
    //console.log(data);
    res.status(200).json(data);
  } catch (err) {
    //console.log(err)
    res.status(422).json(err);
  }
};

const AllExaminers = async (req, res) => {
  try {
    //getting id of the particular product from database on clicking to the image of that item

    const _id = req.params.id;
    //console.log(_id);

    const allexaminers = await Subjectassign.find({ Subject: _id })
      .populate("Examiners", "-password")
      .populate("Subject");

      if(!allexaminers){
        res.status(400).json({message:"No examiner found"});
      }
   // console.log(allexaminers);
    res.status(201).json(allexaminers);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  Login,
  Signup,
  verifyOtp,
  Assignment,
  AllExaminers,
  Allsubject,
};
