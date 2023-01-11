const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newrefundSchema = new Schema(
    {
        orderId: {
          type: String,
        },
        customer_name: {
          type: String,
        },
        mobile_no: {
            type: Number,
        },
        email: {
          type: String,
        },
        unit_price: {
          type: Number,
        },
        time_slot:{
           type: String,
        },
        product_name: {
          type: String,
        },
        total_quantity: {
          type: Number,
        },
        total_price: {
            type: Number,
        },
        payment:{
            type: String,
        },
        payment_status:{
          type:String,
        },
        product_status:{
            type:String,
            default:"Order Placed",
        },
        reason:{
            type: String,
        },
      },
      { timestamps: true }

)
module.exports = mongoose.model("refund", newrefundSchema);