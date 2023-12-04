const mongoose=require("mongoose");
const feedbackSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    message:{
        type:String,
    },
    userName:{
        type:String,
    },
    surName:{
        type:String,
    },
    address:{
        locality: { type: String, trim: true, default: " " },
        city: { type: String, trim: true, default: " " },
        district: { type: String, trim: true, default: " " },
        state: { type: String, trim: true, default: " " },
        pincode: { type: Number, default: " " },
      },

      mobileNumber:{
        type:Number,
      },

      alternateNumber:{
        type:Number,
      }
    },{timestamps:true})

    module.exports=mongoose.model("feedback",feedbackSchema);