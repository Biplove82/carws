const transcModells = require("../Modells/TransactionModels");

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
  let pages = req.query.params;
  try {
    let service = await transcModells
      .find({
        paymentStatus: "sucessful",
      })
      .populate("viewDetail")
      .skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "sucessfull payment", service });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};
const getunsucesspay = async function (req, res) {
  let pages = req.query.params;
  try {
    let ser = await transcModells
      .find({
        paymentStatus: "unsucessful",
      })
      .populate("viewDetail")
      .skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "Unsuccessful Payment", ser });
  } catch (error) {
    res.send({ msg: "Error" });
  }
};

module.exports = {
  transactionData,
  getTransdetail,
  getunsucesspay,
};
