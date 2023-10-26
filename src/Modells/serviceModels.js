const { default: mongoose } = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      default: " ",
    },
    carBrand:{
      type :String ,
      default:" ",
    },
    // mobileNumber: {
    //   type: Number,
    //   default: 0,
    // },
    // status: {
    //   type: String,
    //   default: " ",
    // },
    // serviceAt: {
    //   type: String,
    //   default: "",
    // },
    // paymentMode: {
    //   type: String,
    //   default: " ",
    // },
    // serviceType: {
    //   type: String,
    //   default: " ",
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("service", serviceSchema);
