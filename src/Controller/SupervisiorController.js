const SupervisorModels = require("../Modells/SupervisorModels");
const allUser = require("../Modells/UserModels");
const admin = require("../Modells/AdminModels");
//supervisior create
const data = async function (req, res) {
  let d = req.body;
  let data1 = await SupervisorModels.create(d);
  res.send({ msg: data1 });
};
//api for all  service request user entery enter by user.
const getalluser = async function (req, res) {
  let pages=req.query.pages
  try {
    let user = await allUser.find().skip(10*(pages-1)).limit(10);//pagination 0f 10 user detail.
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Data Not Found" });
  }
};

//get all service request api
const servicerequest = async function (req, res) {
  try {
    let userId = req.params._id;
    let servicerequest = await allUser.findById(userId);
    if (!servicerequest) {
      return res.send({ status: false, msg: "No such service Request exists" });
    }
    res.send({ status: true, data: servicerequest });
  } catch (error) {
    res.status(500).json({ msg: "User Detail Not Found" });
  }
};

//edit service request
const editservicerequest = async function (req, res) {
  try {
    let id = req.params._id;
    let updateservice = req.body;

    let updaterequest = await allUser.findByIdAndUpdate(id, updateservice, {
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

//Approved service request.
const approve_service = async function (req, res) {
  try {
    let service = await allUser.findOne({ status: "approved" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ msg: "Service Not Found" });
  }
};

//Not approved request.

const not_approved_service = async function (req, res) {
  try {
    const notapproved = await allUser.find({
      status: { $ne: "approved", $nin: [" ", null] },
    });
    res.json(notapproved);
  } catch (error) {
    res.json({ msg: "Service not found" });
  }
};
//api for delete service request.
const delete_request = async function (req, res) {
  try {
    let userId = req.params._id;
    let deleteUser = await allUser.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(404).json({ msg: "User not Found" });
    }
    res.json({ msg: "User Delted Sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
//api for assigne service.
const assigne_service = async function (req, res) {
  try {
    let requestId = req.params._id;
    let { supervisorSpecificField, userName } = req.body;
    let update_service = await SupervisorModels.findByIdAndUpdate(
      requestId,
      { supervisorSpecificField, userName },
      { new: true }
    );
    if (!update_service) {
      res.status(404).json({ msg: "Service Request Not Found" });
    }
    res.json(update_service);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  getalluser,
  data,
  servicerequest,
  editservicerequest,
  approve_service,
  not_approved_service,
  delete_request,
  assigne_service,
};
