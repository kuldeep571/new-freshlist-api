const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addbatchSchema = new Schema(
  {
    batch_no:{
      type:Number,
    },
    rack_no: {
        type: Number,
    },
    shelf_life: {
      type: String,
    },
    expiry_date:{
       type: String,
    },
    stock:{
      type: String,
    },
    notify:{
      type: String,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("addbatches", addbatchSchema);
