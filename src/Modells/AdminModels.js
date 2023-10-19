const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: " " },
    surName: { type: String, trim: true, default: " " },
    userName:{
      type :String ,
      default:" "
    },
    

    mobileNumber: {
      type: Number,
      default: 0,
    },
    
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", AdminSchema);
