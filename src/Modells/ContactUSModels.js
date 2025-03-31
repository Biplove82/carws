const mongoose=require("mongoose");
const contactusSchema = new mongoose.Schema({
    Hours:{
        Days: {type:String,default:"Monday"},
        
        },
    
    
    

},{timestamps:true});
module.exports=mongoose.model('contactus',contactusSchema);
