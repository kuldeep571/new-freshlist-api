const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    category_name: {
        type: String,
    },
    desc: {
      type: String,
    },
    image:{
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
