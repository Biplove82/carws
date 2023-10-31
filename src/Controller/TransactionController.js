const transcModells = require("../Modells/TransactionModels");
const servicereq = require("../Modells/serviceRequestModels");

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
      })
      .skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "sucessfull payment", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const getunsucesspay = async function (req, res) {
  let pages = req.query.pages;
  try {
    let service = await transcModells
      .find({
        paymentStatus: "unsucessful",
      }).skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "Unsuccessful Payment", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const getTrans = async function (req, res) {
  // let pages=req.query.pages;
  const paymentid = req.params._id;
  try {
    let service = await servicereq.findById(paymentid);
    res.send({ msg: "successfully found Transaction", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  transactionData,
  getTransdetail,
  getunsucesspay,
  getTrans,
};
