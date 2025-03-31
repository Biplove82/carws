const mongoose = require("mongoose");
const serviceplanschema = new mongoose.Schema(
  {
    serviceName: { type: String },
  
    brand: { type: String },
    servicePlan:{type:String},

  },
  { timestamps: true }
);
module.exports = mongoose.model("ServicePlan", serviceplanschema);
