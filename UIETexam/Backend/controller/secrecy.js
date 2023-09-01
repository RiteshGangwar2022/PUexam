const mongoose=require("mongoose");
const Secrecy= require("../Database/Models/Secrecy");
const bcrpt=require("bcrypt");


const { hashPassword } = require("../utils/bycrpt");
const { sendOtpEmail } = require("../utils/mailer");
const { otpModel } = require("../Database/Models/Otp");


//implementing two factor authentication(using password, second=>using OTP verification)
const Login = async (req, res) => {
   
    try {
        const { email,role, password } = req.body;
        //console.log(req.body);
        
        console.log("Helloo");
        if (!email || !role || !password) {
          console.log("Ho0");
            res.status(422).json({ error: "enter details properly" });
        }
        console.log("1");
        const secrecydata = await Secrecy.findOne({ email: email });
         
        console.log(secrecydata);
        if (secrecydata) {
            const ismatch = await bcrpt.compare(password, secrecydata.password);
           
           
            const checkrole=secrecydata.role==role;
            

            if (!ismatch) {
                console.log("Ho1");
                res.status(422).json({ message: "invalid credential" });
            }
            else if(checkrole!=true){
              console.log("Ho2");
              res.status(422).json({ message: "invalid role" });
            }
            else {
                   
              
             //after user successfully, enter right password and email,
             //we will send an otp on his email to again verify user

             //it will send otp to user
             const sendCode = await sendOtpEmail(req.body.email, secrecydata._id);
             
                   
             res.status(200).json(secrecydata);
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
            const { name, email,mobile,role, password} = req.body;
                 
            const hash= await hashPassword(req.body.password);
            const newsecrecy = new Secrecy({ name, email, mobile,role, password:hash});
            const data = await newsecrecy.save();
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
  
module.exports = {Login,Signup,verifyOtp};


