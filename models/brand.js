const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brandschema = new Schema(
  {
    brand_name: {
        type: String,
    },
    desc: {
      type: String,
      // required: true,
    },
    image:{
       type: Array,
    },
    discount:{
      type: String,
    },
    status:{
        type:String,
        default:"Active",
        // // active: "Active",
        // deactive: "Inactive",
    },
    data:{
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("brands", Brandschema);
