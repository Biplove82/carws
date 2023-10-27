const mongoose = require("mongoose");
const packageSechema = new mongoose.Schema({
    
}, { timestamps: true });
module.exports = mongoose.model("package", packageSechema);
