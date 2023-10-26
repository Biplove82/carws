const serviceModells=require("../Modells/serviceModels");
const servicerequest=require("../Modells/serviceRequestModels");

//get all Requested service.
const getallsrvcDetail=async function(req,res){
  try {
    let pages=req.query.params;
    let srvc=await servicerequest.find()
    .skip(10*(pages-1)).limit(10);
    res.send({msg:"ALL requested Services",srvc:srvc})
    
  } catch (error) {
    res.send({msg:"Service Request Not Found"})
  }
}
const serviceSubCategory = async function(req,res){
  try {
    let pages=req.query.params;
    let subcat=await serviceModells.find()
    .skip(10*(pages-1)).limit(10);
    res.send({msg:"All Service Sub Category",subcat:subcat})
  } catch (error) {
    res.send({msg:"Service Subcategory not found"})
    
  }
}
const createsubact=async function(req,res){
  try {
    let data=req.body
    let newdata= await serviceModells.create(data);
    res.send({msg:newdata});
  } catch (error) {
    res.status({msg:"Data not Created"})
  }
}

module.exports={
  getallsrvcDetail,serviceSubCategory,createsubact
}