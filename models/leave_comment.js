const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leavecommit_Schema = new Schema(
    {
        customerId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        write_comment:{
            type: String,
        },
        name:{
            type: String,
        },
        email:{
            type: String,
        },
        website:{
            type: String,
        },
        date:{
            type: String,
        },
        status:{
            type: String,
            default: "Active",
        },
    },
    {timestamps: true},
) 
module.exports = mongoose.model("leavecomment", leavecommit_Schema)