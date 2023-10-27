const mongoose = require("mongoose");
const serreqschema = new mongoose.Schema(
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
    addedBy: {
      type: String,
      default: " ",
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
    status: {
      type: String,
      default: " ",
    },
    serviceAt: {
      type: String,
      default: "",
    },
    paymentMode: {
      type: String,
      default: " ",
    },
    serviceType: {
      type: String,
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

module.exports = mongoose.model("servicerequest", serreqschema);
