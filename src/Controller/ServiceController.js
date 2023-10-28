
const servicerequest = require("../Modells/serviceRequestModels");
const srvmodellsa = require("../Modells/srvcModells");
const carmodells= require("../Modells/CarModells");


const serviceSubCategory = async function (req, res) {
  try {
    let pages = req.query.params;
    let subcat = await serviceModells
      .find()
      .skip(10 * (pages - 1))
      .limit(10);
    res.send({ msg: "All Service Sub Category", subcat: subcat });
  } catch (error) {
    res.send({ msg: "Service Subcategory not found" });
  }
};
const createsubact = async function (req, res) {
  try {
    let data = req.body;
    let newdata = await serviceModells.create(data);
    res.send({ msg: newdata });
  } catch (error) {
    res.status({ msg: "Data not Created" });
  }
};
//Select service type.
const createservice = async function (req, res) {
  try {
    let data = req.body;
    let nwdata = await srvmodellsa.create(data);
    res.send({ msg: nwdata });
  } catch (error) {
    res.send({ msg: "Data not created" });
  }
};
//get al service
const getservice = async function (req, res) {
  let pages = req.query.params;
  try {
    let srv = await srvmodellsa
      .find()
      .skip(10 * (pages - 1))
      .limit(10);

    res.send({ msg: "ALL service ", srv: srv });
  } catch (error) {
    res.send({ msg: "Service not Found" });
  }
};
const cartype=async function(req,res){
  try {
    let data=req.body;
    let car= await carmodells.create(data);
    res.send({msg:"car created successfully",car:car});
  } catch (error) {
    res.send({msg:"car type not created "})
  }
};

const getcartype=async function(req,res){
  try {
    let c = await carmodells.find()
    res.send({msg:"car type",c:c});
    
  } catch (error) {
    res.send({msg:"cartype nnot found"})
  }
}

module.exports = {
  serviceSubCategory,
  createsubact,
  createservice,
  getservice,
  cartype,
  getcartype,
};
