const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    
    amount: {
      type: String,
      default: 0,
    },
    paymentStatus:{
      type:String,
      
    },
    viewDetail:
    { type: mongoose.Schema.Types.ObjectId, ref: "servicerequest" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("transcation", transactionSchema);
