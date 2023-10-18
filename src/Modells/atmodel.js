const mongoose=require('mongoose')

//define schema
const UserSchema=new mongoose.Schema({
    role:{
        type:Number,
       
    },
    email:{
        type:String,
       
    
    },
    password:{
        type:String,
        
    },
    contact_no:{
        type: String,
        
    }
    // image:{
    //     public_id:{
    //         type:String,
    //         required:true
    //     }
        
    // }
    // image:{
    //     public_id:{
    //         type:String,
    //     },
    //     url:{
    //         type:String,
    //     },
    // },
},{timestamps:true})

//create collection
const UserModel=mongoose.model('User',UserSchema)
//                                  ^collection name
module.exports=UserModel