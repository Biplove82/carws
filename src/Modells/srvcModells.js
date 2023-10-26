const mongoose=require("mongoose");
 const srvcschema=new mongoose.Schema({
    serviceName: {
        type: String,
        default: " ",
      },
      carBrand:{
        type :String ,
        default:" ",
      },

},{timestamps:true});
module.exports= mongoose.model("srvcmodels", srvcschema);