const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      default: " ",
    },
    price: {
      type: Number,
      default: " ",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarSchema", carSchema);
