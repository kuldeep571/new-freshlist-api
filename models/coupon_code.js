const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newcouponSchema= Schema(
    {
        coupon_type:{
            type: String,
        },
        coupon_title:{
            type: String,
        },
        coupon_code:{
            type: String,
        },
        limit_user:{
            type: String,
        },
        discount_type:{
            type: String,
        },
        discount_amount:{
            type: Number,
        },
        min_purchase:{
            type: Number,
        },
        start_date:{
            type: String,
        },
        end_date:{
            type: String,
        },
        status:{
            type: String,
            default: "Active",
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("coupon", newcouponSchema);