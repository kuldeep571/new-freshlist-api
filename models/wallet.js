const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newwalletSchema = new Schema(
    {
        mobile_no:{
            type: Number,
        },
        orderId :{
            type: String,
        },
        name:{
            type: String,
        },
        wallet_type:{
            type: String,
        },
        amount:{
            type: Number,
            default: 0,
        },
        remarks:{
            type: String,
            default: "false",
        },
    },
    {timestamps: true},
)

module.exports = mongoose.model("wallet", newwalletSchema)