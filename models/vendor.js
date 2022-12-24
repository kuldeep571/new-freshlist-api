const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const newvendorSchema = Schema(
    {
        firstname:{
            type: String,
        },
        lastname:{
            type: String,
        },
        phone:{
            type: Number,
        },
        vendor_img:{
            type: Array,
        },
        email:{
            type: String,
        },
        password:{
            type: String,
        },
        confirmpassword:{
            type: String,
        },
        shop_name:{
            type: String,
        },
        shop_address:{
            type: String,
        },
        shop_logo:{
            type: Array,
        },
        shop_banner:{
            type: Array,
        },
        status:{
            type:String,
            default: "Active",
        },
    },
    {timestamps: true},
)

module.exports = mongoose.model("vendor", newvendorSchema);