const mongoose=require("mongoose");
const contactusSchema = new mongoose.Schema({
    Hours:{
        Days: {type:String,default:"Monday"},
        
        },
    //    userName:{
    //     type:String,
    //    default:" ",
    // },
    // mobileNumber:{
    //     type:String,
    //     default: "+917017866149",
      
    // },
    // address:{
    //     type:String,
    //     default:"Noida Delhi NCR UP",
    // },

    
    

},{timestamps:true});
module.exports=mongoose.model('contactus',contactusSchema);
