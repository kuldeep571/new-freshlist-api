const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const wishlistSchema = new Schema(
    {
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        stock_status:{
            type: String,
            default: "In stock",
        },
    },
    {timestamps: true}
);  


module.exports = mongoose.model("wishlist", wishlistSchema)