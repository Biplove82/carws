const mongoose = require("mongoose");

const SupervisorSchema = new mongoose.Schema({
    firstName: {
    type: String,
   
  },
 
  surName: {
    type: String,
   
  },
  altenateNumber:{
    type :String ,
   
  },
  userName: { type: String,  },
  password: { type: String, },
  confirmPassword: {
    type: String,
    
  },
  createUsername: {
    type: String,
 
  },
  role: {
    type: Number,
    default: 2,
  },
  price: {
    type: Number,
    default: 0,
  },
  service: {
    type: String,
    default: " ",
  },

  mobileNumber: { type: Number, default: 0 },

  supervisorSpecificField: {
    type: String,
    trim: true,
    default: " ",
  },

  address: {
    locality: { type: String, trim: true },
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true},
    pincode: { type: Number, trim: true },
  },
},{timestamps:true});
module.exports = mongoose.model("supervisor", SupervisorSchema);
