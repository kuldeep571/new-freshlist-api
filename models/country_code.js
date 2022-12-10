const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitsSchema = new Schema(
{   
    code:{
        type:String,
    },
},

{timestamps:true}

);

module.exports = mongoose.model("countrycode", unitsSchema);
