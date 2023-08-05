const mongoose=require("mongoose");
const Admin = require("../Database/Models/Admin");
const bcrpt=require("bcrypt");


const { hashPassword } = require("../utils/bycrpt");
const { sendOtpEmail } = require("../utils/mailer");
const { otpModel } = require("../Database/Models/Otp");


//implementing two factor authentication(using password, second=>using OTP verification)
const Login = async (req, res) => {
   
    try {
        const { email,role, password } = req.body;
        //console.log(req.body);

        if (!email || !role || !password) {
            res.status(422).json({ error: "enter details properly" });
        }
        const admindata = await Admin.findOne({ email: email });

        if (admindata) {
            const ismatch = await bcrpt.compare(password, admindata.password);
           
           
            const checkrole=admindata.role==role;
            

            if (!ismatch) {
                
                res.status(422).json({ message: "invalid credential" });
            }
            else if(checkrole!=true){
              res.status(422).json({ message: "invalid role" });
            }
            else {
                   
              
             //after user successfully, enter right password and email,
             //we will send an otp on his email to again verify user

             //it will send otp to user
             const sendCode = await sendOtpEmail(req.body.email, admindata._id);
             
                   
             res.status(200).json(admindata);
                //console.log(admindata)
            } 

        }
        else {
            res.status(422).json({ message: "invalid credential" });
        }

    }
    catch (err) {
        res.status(422).json(err);
    }

}

const Signup = async(req,res)=>{

    
    try {
            const { name, email,mobile,gender,role, password} = req.body;
                 
            const hash= await hashPassword(req.body.password);
            const newadmin = new Admin({ name, email, mobile,gender,role, password:hash});
            const data = await newadmin.save();
            console.log(data);
            res.status(201).json(data);
    }
    catch (err) {
        console.log(err)
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
      
      const userOtpRecords = await otpModel.find({ entityId: userId }).sort({ createdAt: -1 });
         
       
      if (userOtpRecords.length <0) {
        res.status(500).json({
          status: "failure",
          message: "Account Record doesnt exist . Please login or signin",
        });
      }
   console.log(userOtpRecords); 
      const otp=userOtpRecords[userOtpRecords.length-1].otp;
      const validOtp = await bcrpt.compare(body_otp, otp);
      console.log(body_otp);
     console.log(otp);
     console.log(validOtp); 

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
  
module.exports = {Login,Signup,verifyOtp};



