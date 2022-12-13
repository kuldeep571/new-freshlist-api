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
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    sub_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subproductcategories",
    },
    status:{
        type:String,
        default:"Active",
    },
},
{timestamps:true}

);

module.exports = mongoose.model("createhubs", newhubSchema);
