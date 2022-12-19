const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
{   
    orderId:{
        type:String,
    },
    phone_no:{
        type:String,
    },
    orderd_from:{
        type:String,
    },
    order_zone:{
        type:String,
    },
    billing_add:{
        type:String,
    },
    delivery_add:{
        type:String,
    },
    date:{
        type:String,
    },
    delivery_date:{
        type:String,
    },
    time_slot:{
        type:String,
    },
    items:{
        type:String,
    }, 
    assing_drive:{
        type:String,
    },
    notify_customer:{
        type:String,
    },
    status:{
        type:String,
        default:"Order Placed",
    },
},
{timestamps:true}

);


module.exports = mongoose.model("orderproduct", orderSchema);
