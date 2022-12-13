const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newhubSchema = new Schema(
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
    email:{
        type:String,
    },
    address:{
        type:String,
    },
    delivery_zone:{
        type:String,
    },
    category:{
        type:String,
    },
    sub_category:{
        type:String,
    },
    status:{
        type:String,
        default:"Active",
    },
},
{timestamps:true}

);



module.exports = mongoose.model("Newhub", newhubSchema);
