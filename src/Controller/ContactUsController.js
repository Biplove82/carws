const contactus=require("../Modells/ContactUSModels");
const cctus= async function(req,res){
    try {
        let data=req.body;
        let contact=await contactus.create(data);
        res.status(200).json({msg:"contactUs",contact});
    } catch (error) {
        res.status(500).json(error);
    }
};

const getcontactus=async function(req,res){
    try{
       let contacts= await contactus.find().select('-_id');
       res.status(200).json(contacts);
      
}catch(error){
    res.status(500).json(error);
}
};

module.exports={
    cctus,getcontactus
}