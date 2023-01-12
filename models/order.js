const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
{  
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderId:{
        type:String,
    },
    name:{
        type: String,
    },
    delivery_slot:{
        type: String,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
    },
    attribute:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"units",
    },
    quantity:{
        type: String,
    },
    phone_no:{
        type:Number,
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
    order_date:{
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
    notify:{
        type:Array,
    },
    email:{
        type: String,
    },
    previous_add:{
        type: String,
    },
    new_address:{
        type: String,
    },
    status:{
        type:String,
        default:"Order Placed",
    },
    payment_status:{
        type: String,
        default: "paid",
    },
    shipping_type:{
        type: String,
    },
    choose_driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"drive",
    },
    driver_will_get:{
        type: String,
    },
    expected_delivery_date:{
        type: String,
    },
},
{timestamps:true},

);


module.exports = mongoose.model("orderproduct", orderSchema);
