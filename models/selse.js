const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newselseSchema = new Schema(
    {
        product_name:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"products",
        },
        date:{
            type: String,
        },
        hubs:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"createhubs",
        },
        total_selse:{
            type: Number,
            default: 0,
        },
        status:{
            type: String,
            default: "Active",
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("selse", newselseSchema);