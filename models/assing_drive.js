const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assingSchema = new Schema(
    {
        firstname:{
            type: String,
        },
        lastname:{
            type: String,
        },
        identity_type:{
            type:String,
        },
        identity_no:{
            type:String,
        },
        phone_no:{
            type:String,
        },
        address:{
            type:String,
        },
        deliveryman_img:{
            type: Array,
        },
        identity_img:{
            type:Array,
        },
    },
    {timestamps: true},
);  
module.exports = mongoose.model("drive", assingSchema);