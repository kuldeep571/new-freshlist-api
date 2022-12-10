const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitsSchema = new Schema(
{   
    units_name:{
        type:String,
    },
    desc:{
        type:String,
    },
    value:{
        type:Number,
    },
    status:{
        type:String,
        default:"Active",
    },
},
{timestamps:true}

);



module.exports = mongoose.model("units", unitsSchema);
