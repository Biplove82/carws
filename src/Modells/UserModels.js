const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    surName: { type: String, trim: true },

    address: {
      locality: { type: String, trim: true},
      city: { type: String, trim: true },
      district: { type: String, trim: true},
      state: { type: String, trim: true },
      pincode: { type: Number, trim: true },
    },

    userName: {
      type: String,
    },
    passWord: {
      type: String,
    },
    mobileNumber: {
      type: Number,
  
    },
    status: {
      type: String,
      
    },
    serviceAt: {
      type: String,
     
    },

    role: {
      type: Number,
      default: 3,
    },
   
    profileImage: {
      type: String,
      
    },

    paymentMode: {
      type: String,

      default: "COD",
    },

    otp: {
      type: String,
     
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    alternateNumber: {
      type: Number,
      
    },

    PickUp_location: {
      locality: { type: String, trim: true },
      city: { type: String, trim: true},
      district: { type: String, trim: true },
      state: { type: String, trim: true},
      pincode: { type: Number},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usercollection", UserSchema);
