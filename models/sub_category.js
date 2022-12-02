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
  },
  { timestamps: true }
);

module.exports = mongoose.model("subproductcategories", Subcategoryschema);
