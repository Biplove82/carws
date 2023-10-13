const authmodels = require("../Modells/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

const userRegister = async function (req, res) {
  const { userName, passWord, role } = req.body;
  try {
    const existingUser = await authmodels.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const newUser = new authmodels({
      userName,
      passWord: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(200).json({ msg: "User Registered Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" + error });
  }
};

const resbymobnum = async function (req, res) {
  try {
    let { mobileNumber, userName } = req.body;
    let data = await authmodels.findOne({ mobileNumber });
    if (data) {
      return res.status(400).json({ error: "User already exists" });
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

module.exports = { userRegister, resbymobnum, login };
