const SupervisorModels=require("../Modells/SupervisorModels");
const user=require("../Modells/UserModels");
const admin=require("../Modells/AdminModels");

const data=async function(req,res){
    let d=req.body;
     let data1=await SupervisorModels.create(d);
     res.send({msg:data1})
}


module.exports.data=data;