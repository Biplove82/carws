const usermodel = require("../Modells/UserModels");
const supermodel = require("../Modells/SupervisorModels");
const adminmodel = require("../Modells/AdminModels");

const create_admin = async function (req, res) {
  const { firstName, surName, mobileNumber } = req.body;
  try {
    let existAdmin = await adminmodel.findOne({ mobileNumber });
    if (existAdmin) {
      res.status(400).json({ msg: " Admin Already Exists" });
    }
    let newadmin = new adminmodel({ firstName, surName, mobileNumber });
    await newadmin.save();
    res.status(200).json({ msg: "Admin created Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create admin" });
  }
};
const create_supervisior = async function (req, res) {
  const { userName, mobileNumber } = req.body;
  try {
    let existSupervisior = await supermodel.findOne({ mobileNumber });
    if (existSupervisior) {
      res.status(400).json({ msg: " Supervisor already exists" });
    }
    let newsup = new supermodel({ userName, mobileNumber });
    await newsup.save();
    res.status(200).json({ msg: "Supervisor Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create Supervisior" });
  }
};

const allservicerequest = async function (req, res) {
  try {
    let userId = req.params._id;
    let servicerequest = await usermodel.findById(userId);
    if (!servicerequest) {
      return res.send({ status: false, msg: "No such service Request exists" });
    }
    res.send({ status: true, data: servicerequest });
  } catch (error) {
    res.status(500).json({ msg: "User Detail Not Found" });
  }
};

//edit service request
const editservice = async function (req, res) {
  try {
    let id = req.params._id;
    let updateservice = req.body;

    let updaterequest = await usermodel.findByIdAndUpdate(id, updateservice, {
      new: true,
    });
    if (!updaterequest) {
      res.status(404).json({ msg: "User Not Found" });
    }
    res.json(updaterequest);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
//delete service request
const deleterequest = async function (req, res) {
  try {
    let userId = req.params._id;
    let deleteUser = await usermodel.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(404).json({ msg: "User not Found" });
    }
    res.json({ msg: "User Delted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
// Api for aproved dervice
const approveservice = async function (req, res) {
    try {
      let service = await usermodel.findOne({ status: "approved" });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ msg: "Service Not Found" });
    }
  };
  
//Not approved request.

const notapproveservice = async function (req, res) {
    try {
      const notapproved = await usermodel.find({
        status: { $ne: "approved", $nin: [" ", null] },
      });
      res.json(notapproved);
    } catch (error) {
      res.json({ msg: "Service not found" });
    }
  };
  

module.exports = {
  create_admin,
  allservicerequest,
  create_supervisior,
  editservice,
  deleterequest,
  approveservice,
  notapproveservice,
};
