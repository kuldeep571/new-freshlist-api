const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategoryschema = new Schema(
  {
    subcategory_name: {
        type: String,
    },
    desc: {
      type: String,
    },
    image:{
       type: String,
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
    },
    status:{
      type:String,
      default:"Active",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("subproductcategories", Subcategoryschema);
