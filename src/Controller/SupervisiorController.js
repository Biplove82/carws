const SupervisorModels = require("../Modells/SupervisorModels");
const allUser = require("../Modells/UserModels");
const admin = require("../Modells/AdminModels");

const data = async function (req, res) {
  let d = req.body;
  let data1 = await SupervisorModels.create(d);
  res.send({ msg: data1 });
};
//api for all  service request user entery
const getalluser = async function (req, res) {
  try {
    let user = await allUser.find({});
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
const approve_service = async function(req,res){
    try {
      let service= await allUser.findOne({status:"approved"});
  res.status(200).json(service);
    } catch (error) {
      res.status(500).json({msg:"Service Not Found"})
      }};

module.exports = { getalluser, data, servicerequest,editservicerequest,approve_service };
