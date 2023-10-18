const authmodels = require("../Modells/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JWT_SECRET = "your-secret-key";
// const twilio = require("twilio")
//
// const client = twilio('YOUR_TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_AUTH_TOKEN');
// const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';
const randomstring = require("randomstring");
const accountSid = "ACffb6cb2d6ca7ecbc31b02de496034c08";
const authToken = "bd1437fbaf28bb74cda7cfedd446538a";
const twilioPhoneNumber = "+19524666531"; // Replace with your Twilio phone number
const client = require("twilio")(accountSid, authToken);

const userRegister = async function (req, res) {
  const {
    userName,
    passWord,
    role,
    firstName,
    surName,
    mobileNumber,
    alternateNumber,
    address,
  } = req.body;
  try {
    const existingUser = await authmodels.findOne({ userName: userName });
    if (existingUser) {
      return res.json({ message: "Username already exists" });
    }
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
    });
    await newUser.save();
    res.status(200).json({id: newUser._id, msg: "User Registered Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error });
  }
};

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

const login = async function (req, res) {
  let { userName, passWord } = req.body;
  try {
    let user = await authmodels.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(passWord, user.passWord);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    let token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Invalid User" });
  }
};

const sendotp = async function (req, res) {
  const { userName } = req.body;
  const otp = randomstring.generate({ length: 6, charset: "numeric" });
  try {
    let user = await authmodels.findOne({ userName });
    if (user) {
      user.otp;
      await user.save();
    } else {
      await authmodels.create({ userName, otp });
    }
    await client.messages.create({
      body: "your otp for registration:${otp}",
      from: twilioPhoneNumber,
      to: "+919798715576",
    });
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP."+error});
  }
};
module.exports = { userRegister, resbymobnum, login, sendotp };
