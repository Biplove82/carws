const authmodels=require("../Modells/UserModels");
const bcrypt=require("bcrypt");

const userRegister = async function (req,res){
  const{userName,passWord,role}=req.body
  try {
    const existingUser = await authmodels.findOne({userName:userName  });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new authmodels({userName,passWord,role});
    await newUser.save();
    res.status(200).json({msg:"User Registered Succesfully"})
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error'+error });
  }
};


const resbymobnum= async function(req,res){
  try {
    let {mobileNumber,userName}=req.body;
    let data=await authmodels .findOne({mobileNumber});
    if (data) {
      return res.status(400).json({ error: 'User already exists' });
  }
  data=new authmodels({mobileNumber,userName})
  await data.save();
 
res.status(200).json({msg:"registered complete"})
  } catch (error) {
    res.status(500).json({msg:"Not Registered"+error})
    
  }
}
module.exports={userRegister,resbymobnum}