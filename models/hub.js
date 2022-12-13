const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hubSchema = new Schema(
{   
    name:{
        type:String,
    },
    desc:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    address:{
        type:String,
    },
},
{timestamps:true}

);



module.exports = mongoose.model("hub", hubSchema);
