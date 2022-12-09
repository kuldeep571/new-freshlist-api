const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addbatchSchema = new Schema(
  {
    batch_name:{
      type:String,
    },
    rack_no: {
        type: String,
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

module.exports = mongoose.model("addbatch", addbatchSchema);
