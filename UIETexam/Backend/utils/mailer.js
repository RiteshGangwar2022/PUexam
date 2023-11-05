require("dotenv").config();
const nodemailer = require("nodemailer");
const { hashPassword } = require("./bycrpt");
const { otpModel } = require("../Database/Models/Otp");

const getHrTime = () => {
  var datetime = new Date(Date.now());
  //console.log("Before: ", datetime);
  datetime.setHours(datetime.getHours() + 1);
  //console.log("After: ", datetime);
  return datetime;
};

const sendOtpEmail = async (email, _id) => {
  // The body of the email for recipients

  console.log(email);
  console.log(_id);

  const transporter = nodemailer.createTransport({
  //  host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: "om43singh21@gmail.com",
      pass: process.env.password,
    },
  });

  try {

    //opt code generator
    const code = `${Math.floor(1000 + Math.random() * 9000)}`;
    
   //body of mail
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;


    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Verify Your Account", // Subject
      html: body_html,
    };

    console.log("mail");
    console.log(mailOptions)

    //hashing otp
    const hashedOtp = await hashPassword(code);

      //creating new otp model
    const newOtp = await otpModel.create({
      entityId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: getHrTime(),
    });
     
    console.log("newopt");
    console.log(newOtp);

    await newOtp.save();
    await transporter.sendMail(mailOptions);

    return {
      status: "Pending",
      message: "Verification Otp email sent",
      data: {
        userId: _id,
        email,
      },
    };
  } catch (error) {
    console.log(error);
  }
};


/*const send_forget_password_email = async (email, _id, link) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  try {
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p><a href=${link}>Click here </a>to reset your password</p>
      </body>
    </html>`;

    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject
      html: body_html,
    };

    await transporter.sendMail(mailOptions);

    return {
      status: "success",
      message: "Forget password email sent",
      data: {
        userId: _id,
        email,
      },
    };
  } catch (error) {
    console.log(error);
  }
}*/

module.exports = { sendOtpEmail};
