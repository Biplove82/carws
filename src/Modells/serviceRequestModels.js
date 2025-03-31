const mongoose = require("mongoose");
const serreqschema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    surName: { type: String, trim: true },
    address: {
      locality: { type: String, trim: true },
      city: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: Number, trim: true },
    },
    userName: {
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
    paymentMode: {
      type: mongoose.Schema.Types.ObjectId,ref:"transcation",
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServicePlan",
    },
    PickUp_location: {
      locality: { type: String, trim: true },
      city: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("servicerequest", serreqschema);
