const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newblogSchema = new Schema(
    {
        blog_category:{
            type: String,
        },
        thumbnail_img:{
            type: String,
        },
        title:{
            type: String,
            required: true
        },
        desc:{
            type: String,
        },
        date:{
            type: String,
        },
        status:{
            type:String,
            default:"Active",
        },
    },
    {timestamps: true},
)


module.exports = mongoose.model("blog", newblogSchema);