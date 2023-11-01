const UserModels = require("../Modells/UserModels");
const srvcModels = require("../Modells/serviceRequestModels");

const CreateData = async function (req, res) {
  let Data = req.body;
  let savedData = await UserModels.create(Data);
  res.send({ msg: savedData });
};
//getUserData API
const getUserData = async function (req, res) {
  let userId = req.params._id;
  let userDetails = await UserModels.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

//Update userData API
const updateUser = async function (req, res) {
  let id = req.params._id;
  let updateUserData = req.body;
  try {
    let updateuser = await UserModels.findByIdAndUpdate(id, updateUserData, {
      new: true,
    });
    if (!updateUser) {
      res.status(404).json({ msg: "User Not Found" });
    }
    res.json(updateuser);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
//service Request Api
const serviceRqst = async function (req, res) {
  const {
    userName,
    serviceType,
    addedBy,

    status,
    firstName,
    surName,
    address,
    paymentMode,
    PickUp_location,
    alternateNumber,
    serviceAt,
  } = req.body;

  try {
    const existingUser = await srvcModels.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const serviceRequest = new srvcModels({
      userName,
      serviceType,
      addedBy,
      status,
      firstName,
      surName,
      address,
      paymentMode,
      PickUp_location,
      alternateNumber,
      serviceAt,
    });

    await serviceRequest.save();
    res.status(201).json({
      id: serviceRequest._id,
      message: "Service request created successfully",
    }); //res will be user
  } catch (error) {
    res.status(500).json({ message: "Not Created" + error });
  }
};

//get Detail of Req Api
const getReqbyId = async function (req, res) {
  let userId = req.params._id;
  try {
    let Srvc = await srvcModels.findById(userId);
    res.status(200).json(Srvc);
  } catch (err) {
    res.status(500).json({ msg: "Service Request not found" + err });
  }
};
//get all service add to db

//Delete Api
const Delete = async function (req, res) {
  try {
    let userId = req.params._id;
    let deleteUser = await UserModels.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(404).json({ msg: "User not Found" });
    }
    res.json({ msg: "User Delted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

//api to submite feedBack
const fedBack = async function (req, res) {
  const {
    firstName,
    description,
    userName,
    surName,
    address,
    mobileNumber,
    alternateNumber,
  } = req.body;
  try {
    let fdback = new UserModels({
      firstName,
      description,
      userName,
      surName,
      mobileNumber,
      alternateNumber,
      address,
    });
    await fdback.save();
    res
      .status(201)
      .json({ msg: "Feedback submitted successfully", feedback: fdback });
    // res.status(201).send({msg: fdback });
  } catch (err) {
    res.status(500).json({ message: "Not Submitted" + err });
  }
};
//api for complaint
const compalint = async function (req, res) {
  try {
    const { description, userName } = req.body;
    let comp = new UserModels({ description, userName });
    await comp.save();
    res.send(200).json({ msg: "Complaint Registered" });
  } catch (error) {
    res.status(500).json({ msg: "Error" + error });
  }
};

module.exports = {
  CreateData,
  getUserData,
  updateUser,
  serviceRqst,
  getReqbyId,
  Delete,
  fedBack,
  compalint,
};
