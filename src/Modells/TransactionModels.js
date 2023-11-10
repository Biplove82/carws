const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      default: " ",
    },
    amount: {
      type: String,
      default: 0,
    },
    paymentStatus:{
      type:String,
      default:" "
    },
    // viewDetail: { type: mongoose.Schema.Types.ObjectId, ref: "servicerequest", default:" " },
  },
  { timestamps: true }
);
module.exports = mongoose.model("transcation", transactionSchema);
