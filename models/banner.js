const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema(
    {
        banner_title:{
            type: String,
        },
        banner_img:{
            type: Array,
        },
        banner_url:{
            type: String,
        },
        banner_type:{
            type: String,
        },
        status:{
            type: String,
            default: "Active",
        }
    },
    {timestamps: true},
);

module.exports = mongoose.model("banner", bannerSchema);