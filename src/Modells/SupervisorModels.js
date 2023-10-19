const mongoose = require("mongoose");
//let ObjectId = mongoose.Types.ObjectId;
const SupervisorSchema = new mongoose.Schema({
  // first_name: { type: String, default: " " },
  firstName:{
    type:String,
    default:" "
  },
  //surname: { type: String, default:" " },
surName:{
  type:String,
  default:" "
},
  userName: { type: String, default: " " },
  password: { type: String, default: " " },
  role: {
    type: Number,
    default: 2,
  },
  price:{
    type:Number,
    default:0
  },
  service:{
    type:String,
    default:"",
  },

  mobileNumber: { type: Number, default: 0 },

  supervisorSpecificField: {
    type: String,
    trim: true,
    default: " ",
  },

  address: {
    locality: { type: String, trim: true, default: " " },
    city: { type: String, trim: true, default: " " },
    district: { type: String, trim: true, default: " " },
    state: { type: String, trim: true, default: " " },
    pincode: { type: Number, trim: true, default: " " },
  },
});
module.exports = mongoose.model("supervisor", SupervisorSchema);
