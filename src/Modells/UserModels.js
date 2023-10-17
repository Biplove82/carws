const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: " " },
    surName: { type: String, trim: true, default: " " },

    address: {
      locality: { type: String, trim: true, default: " " },
      city: { type: String, trim: true, default: " " },
      district: { type: String, trim: true, default: " " },
      state: { type: String, trim: true, default: " " },
      pincode: { type: Number, trim: true, default: " " },
    },

    userName: {
      type: String,
    },
    passWord: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      default: 0,
    },
    status:{
      type:String,
      default:" "
    },
    serviceAt:{
      type : String,default:''
    },

    role: {
      type: Number,
      default: 3,
    },
    description: {
      type: String,
    },

    profileImage: {
      type: String,
      default: " ",
    },

    paymentMode: {
      type: String,

      default: "COD",
    },

    otp: {
      type: String,
      default: " ",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    alternateNumber: {
      type: Number,
      default: " ",
    },

    PickUp_location: {
      locality: { type: String, trim: true, default: " " },
      city: { type: String, trim: true, default: " " },
      district: { type: String, trim: true, default: " " },
      state: { type: String, trim: true, default: " " },
      pincode: { type: Number, default: " " },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usercollection", UserSchema);
