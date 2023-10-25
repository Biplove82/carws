const { default: mongoose } = require("mongoose")

const serviceSchema=new mongoose.Schema({
    serviceName:{
        type:String,
        default:" ",
    }

}, { timestamps: true })
module.exports= mongoose.model("service", serviceSchema);