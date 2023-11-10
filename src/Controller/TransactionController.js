const transcModells = require("../Modells/TransactionModels");
const servicereq = require("../Modells/serviceRequestModels");
const supermodel = require("../Modells/SupervisorModels");
const userModells= require("../Modells/UserModels");

const transactionData = async function (req, res) {
  try {
    let d = req.body;
    let createDataTransction = await transcModells.create(d);
    res.send({ msg: createDataTransction });
  } catch (error) {
    res.send({ msg: "Transation not created" });
  }
};
const getTransdetail = async function (req, res) {
  let pages = req.query.pages;
  try {
    let service = await transcModells
      .find({
        paymentStatus: "sucessful",
      }).populate("viewDetail")
      
      .skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "sucessfull payment", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const getunsucesspay = async function (req, res) {
  // let pages = req.query.pages;
  let userId = req.params._id;
  try {
    let service = await transcModells
      .find({
        paymentStatus: "unsucessful",
      })
      // .populate("viewDetail")
      // .skip(10* (pages - 1))
      // .limit(10);
      let viewdetail=await servicereq.findById({userId});
      let ans={...service,...viewdetail};
    res.send({ msg: "Unsuccessful Payment", ans });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const getTrans = async function (req, res) {
  // let pages=req.query.pages;
  const paymentid = req.params._id;
  try {
    let service = await transcModells.findById(paymentid);
    res.send({ msg: "successfully found Transaction", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const countsucessfulypay =async function(req,res){
  let count=await transcModells.find({ paymentStatus: "sucessful",}).count();
  let countunsuc= await transcModells.find({ paymentStatus: "unsucessful",}).count();
  let supervisiorcount=await supermodel.find({role:"2"}).count();
  let activeuser = await userModells.find({isActive:true}).count();
  let inactiveuser = await userModells.find({isActive:false}).count();
  let service= await servicereq.find().count();
  res.send({ unsucessfulPay:countunsuc, sucessfullypay:count, supervisior:supervisiorcount, activeuser:activeuser, inactiveuser:inactiveuser,service:service});
};

// const unsucessfulpay= async function(req,res){
//   let count=await transcModells.find({ paymentStatus: "unsucessful",}).count();
//   res.send({msg:"Unsuccessful paymenet",count})
// };
// const countsupervisior=async function(req,res){
//   let count=await supermodel.findOne({role:"2"}).count();
//   res.send({msg:"Supervisor Count",count});
// };


module.exports = {
  transactionData,
  getTransdetail,
  getunsucesspay,
  getTrans,
  countsucessfulypay,
};
