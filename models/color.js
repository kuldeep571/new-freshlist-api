const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    color_name :{
        type : String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("color", colorSchema);
