const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newpincodeSchema = new Schema(
    {
        title:{
            type: String,
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
)


module.exports = mongoose.model("pincode", newpincodeSchema);