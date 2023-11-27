const authmodels = require("../Modells/UserModels");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JWT_SECRET = "your-secret-key";

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
      return res.status(401).json({ message: "Username already exists" });
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
    res
      .status(200)
      .json({ id: newUser._id, msg: "User Registered Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error });
  }
};

const sendotp = async function (req, res) {
  try {
    const { userName } = req.body;

    // Find the user by email
    const user = await authmodels.findOne({ userName });

    // Check if the user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the new OTP to the user in the database
    user.otp = otp;
    await user.save();

    // Send the OTP to the user's email
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5baa42b75630c2",
        pass: "7a0468f22aaaeb",
      },
    });
    const info = await transport.sendMail({
      from: '"Your Name" <biplovmandal.mandla@gmail.com>', // Update with your name and email
      to: userName,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<b>Your OTP for email verification is: ${otp}</b>`,
    });

    res
      .status(200)
      .json({ message: "OTP sent successfully. Check your email for OTP." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
module.exports = { userRegister, resbymobnum, login, sendotp };
