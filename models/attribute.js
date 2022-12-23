const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newattributeSchema = new Schema(
    {
        attribute_name:{
            type: String,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("attribute", newattributeSchema)