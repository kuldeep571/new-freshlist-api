const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title:{
      type:String,
    },
    category_name: {
        type: String,
    },
    desc: {
      type: String,
    },
    image:{
       type: Array,
    },
    thumbnail_img:{
      type: Array,
    },
    web_banner:{
      type: Array,
    },
    app_banner:{
      type: Array,
    },
    type:{
      type: String,
    },
    url:{
      type: String,
    },
    feature:{
      type: String,
    },
    status:{
        type:String,
        default: "false",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
