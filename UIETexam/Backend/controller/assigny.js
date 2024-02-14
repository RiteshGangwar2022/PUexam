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
const Session = require("../Database/Models/Session");
const AssignedExaminee = require('../Database/Models/AssignedExaminee');
const Examinee = require("../Database/Models/Examinee");

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
    
    const otp = userOtpRecords[userOtpRecords.length - 1].otp;
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
// ******************************************************* (Fix It)
const Assignment = async (req, res) => {
  try {
    const {
      SubjectCode,
      Branch,
      Option,
      SessionInfo,
      SemesterNo,
      ExamCode,
      DOE,
      ExaminersId,
      Year,
    } = req.body;

    // if (!DOE || !ExamCode || !Branch || !SemesterNo || !SubjectCode || !Option || !SessionInfo || !Year || !ExaminersId) {
    //   return res.status(400).json({ message: "Please Fill all the fields" });
    // }
    // Updating assigned Examiners from ExaminerId to AssignedExaminee Db
    for (id in ExaminersId){
      assignExaminee = new AssignedExaminee({
        "ExamineeId": ExaminersId[id],
        "Subject": SubjectCode
      }).save()
    }
    // Creating a new Session object from given ExaminersId, Year, and SessionInfo
    const ss = await new Session({
      "Year": Year,
      "Session": SessionInfo,
    })
    for (id in ExaminersId){
      await ss.AssignedExaminers.push(ExaminersId[id])
      // updating assignment info in examiners table
      try{
        // check if existing examiner exists
        let examiner = await Examinee.findOne({_id: ExaminersId[id]}) 
        if (examiner == null){
          examiner = await new Examinee({
            "_id": ExaminersId[id],
          })
        }
        await examiner.Exam.push(SubjectCode)
        examiner.save()
      }catch(err){
        console.log(err)
      }
    }
    ss.save()


    // Check for previous existing Exam Record and then add new session to it.
    let Assignment = await Exam.findOne({_id: SubjectCode})
    if (Assignment == null){
      // No existing exam exists for the given SubjectCode create a new Exam Object
      Assignment = await new Exam({
        "_id": SubjectCode,
        "Branch": Branch,
        "Option": Option,
        "SessionInfo": SessionInfo,
        "SemesterNo": SemesterNo,
        "ExamCode": ExamCode,
        "DOE": DOE, 
      }).save();
    }
    try{
      await Assignment.Sessions.push(ss)
    }catch(err){
      console.log(err)
    }
    console.log(Assignment)
    await Assignment.save()

    res.status(200).json(Assignment);
  } catch (error) {
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
// *******************************************************************
// Before
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

// Replace 
const AllSubjectProfessors = async(req, res) => {
  try{
    // get subject code (Now subject Code )
    const SubjectCode = req.params.SubjectCode
    console.log(SubjectCode)
    const AllProffessors = await Subjectassign.find({"_id": SubjectCode}) 
    .populate('Examiners', '-password')
            
    if (!AllProffessors){
      res.status(400).json({message: "No Examiner found"})
    }
    res.status(201).json(AllProffessors)
  }catch(err){
    console.log(err)
    res.status(400).json(err)
  }
}
// *********************************************************************

const ExamList= async(req,res)=>{

  try {
    
    const examList = await Exam.find({})
      .populate("Examiners", "-password")
      .populate("Subject");
      if(!examList){
        res.status(400).json({message:"No examiner found"});
      }
   
    res.status(201).json(examList);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

// *************************************************************************

const CreateSession = async(Year, SessionInfo, AssignedExaminers) => {
  const newSession = new Session({
    "Year": Year,
    "Session": SessionInfo,
    "AssignedExaminers": AssignedExaminers
  })
  const data = await newSession.save()
}

const CreateAssignedExaminee = async(SubjectCode, Examiners) => {
  for (ProfessorId in Examiners){
    const newAssignedExaminee = new AssignedExaminee({
      "_id": ProfessorId,
      "Subject": SubjectCode
    })
    const data = await newAssignedExaminee.save()
  }
}
const getProfessorDetail=async(req,res)=>{
  try{
    const _id = req.params.id;
    console.log(_id);
    if(!_id) return res.status(500).json("Null Data");
    const examiner = await Professor.findOne({"_id": _id});
     if(examiner) return res.status(200).json(examiner);
     return res.status(500).json("Can't Find Professor");
  }
  catch(error)
  {
    console.log("Error in getProfessor Detail "+ error);
  }
}

module.exports = {
  Login,
  Signup,
  verifyOtp,
  Assignment,
  AllExaminers,
  Allsubject,
  ExamList,
  AllSubjectProfessors,
  getProfessorDetail
};
