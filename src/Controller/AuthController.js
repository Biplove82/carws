const authmodels = require("../Modells/UserModels");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JWT_SECRET = "your-secret-key";
const otpGenerator=require("otp-generator");

const userRegister = async function (req, res) {
  // generatedOTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  // const generatedOTP=Math.floor(100000 + Math.random() * 900000);
  //   console.log(generatedOTP);
   
  try {
    const {
      userName,
      passWord,
      role,
      firstName,
      surName,
      mobileNumber,
      alternateNumber,
      address,
      // otp
    } = req.body;

    const existingUser = await authmodels.findOne({ userName: userName });
    if (existingUser) {
      return res.status(401).json({ message: "Username already exists" });
    }
    // if (otp !== generatedOTP) {
    //   return res.status(401).json({ message: "Invalid OTP" });
    // }//save ke pahele hoga
    

    const hashedPassword = await bcrypt.hash(passWord, 10);
    const newUser = new authmodels({
      userName,
      passWord: hashedPassword,
      role,
      firstName,
      surName,
      mobileNumber,
      alternateNumber,
      address,
      // otp: generatedOTP
    });
   
    
    await newUser.save();
   
    res
      .status(200)
      .json({ id: newUser._id, msg: "User Registered Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error });
  }
};

//user verification with otp

const sendotp = async function (req, res) {
  try {
    const { userName } = req.body;
  
    const otp = Math.floor(100000 + Math.random() * 900000);

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "biplavmandal.mandal@gmail.com",
        pass: "abnj vnct roto spfn",
      },
    });
    const info = await transport.sendMail({
      from: '"Your Name" <biplavmandal.mandal@gmail.com>', // Update with your name and email
      to: userName,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<b>Your OTP for email verification is: ${otp}</b>`,
    });
    transport.sendMail(info, (err, result) => {
      if (err) {
        console.log("Error");
      }

      res.status(200).json({
        message: "OTP sent successfully. Check your email for OTP.",
        otp: otp,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//forgetpasswprd
const forgetpasswprd = async function (req, res) {
  try {
    const { userName } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await authmodels.findOneAndUpdate(
      { userName },
      { otp },
      { new: true, upsert: true }
    );

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "biplavmandal.mandal@gmail.com",
        pass: "abnj vnct roto spfn",
      },
    });
    const info = await transport.sendMail({
      from: '"Your Name" <biplavmandal.mandal@gmail.com>', // Update with your name and email
      to: userName,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<b>Your OTP for email verification is: ${otp}</b>`,
    });
    transport.sendMail(info, (err, result) => {
      if (err) {
        console.log("Error");
      }
      res.status(200).json({
        message: "OTP sent successfully. Check your email for OTP.",
        otp: otp,
        userName: userName,
        userId: user._id,
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" + error });
  }
};


//resetpassowrd
const resetpass = async function (req, res) {
  try {
    const { userName, otp, newPassword } = req.body;
    const user = await authmodels.findOne({ userName: userName, otp });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passWord = hashedPassword;
    user.otp = null;
    // user.passWord = newPassword;
    // user.otp = null;

   let x= await user.save();
console.log(x),
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//resend otp
const resendOtp = async function (req, res) {
  try {
    const { userName } = req.body;
    const user = await authmodels.findOne({ userName });
     if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
     let x=await user.save();
    console.log(x);
    var transport = nodemailer.createTransport({
      service: "gmail",
      // host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
     auth: {
        user: "biplavmandal.mandal@gmail.com", //"5baa42b75630c2",
        pass: "abnj vnct roto spfn", //"7a0468f22aaaeb",
      },
    });
    const info = await transport.sendMail({
      from: '"Your Name" <biplavmandal.mandal@gmail.com>', 
      to: userName,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<b>Your OTP for email verification is: ${otp}</b>`,
    });
    transport.sendMail(info, (err, result) => {
      if (err) {
        console.log("Error is sending Mail", err);
      }
      res.status(200).json({
        message: "OTP resent successfully. Check your email for OTP.",
        otp: otp,
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//user registration with mobile number

const resbymobnum = async function (req, res) {
  try {
    let { mobileNumber, userName } = req.body;
    let data = await authmodels.findOne({ mobileNumber });
    if (data) {
      return res.json({ error: "User already exists" });
    }
    data = new authmodels({ mobileNumber, userName });
    await data.save();

    res.status(200).json({ msg: "registered complete" });
  } catch (error) {
    res.status(500).json({ msg: "Not Registered" + error });
  }
};

//user login
const login = async function (req, res) {
  let { userName, passWord } = req.body;
  try {
    let user = await authmodels.findOne({ userName });
    if (!user || !(await bcrypt.compare(passWord, user.passWord))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    let token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Invalid User" +error});
  }
};
const getlogindata= async function(req,res){
  let data =  req.params._id;
  try {
    const loginDetail = await authmodels.findById(data).select("-passWord");
    res.status(200).json({loginDetail});
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"});
    
  }
}

module.exports = {
  userRegister,
  resbymobnum,
  login,
  sendotp,
  forgetpasswprd,
  resetpass,
  resendOtp,
  getlogindata,
  
};
