const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategoryschema = new Schema(
  {
    childcategory_name:{
        type: String,
    },
    subcategory_name: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"subproductcategories",
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
  },
  { timestamps: true }
);


module.exports = mongoose.model("childcategory", Subcategoryschema);
