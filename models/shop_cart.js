const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newcartSchema = new Schema(
    {
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        unit_price:{
            type: Number,
        },
        quantity:{
            type:Number,
        },
        subtotal:{
            type:Number,
        },
    },
    {timestamps: true}
)

module.exports =mongoose.model("cart", newcartSchema)