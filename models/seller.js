const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
        type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    image:{
       type: String,
    },
    password: {
      type: String,
    },
    cnfrmPassword: {
      type: String,
    },
    status:{
      type:String,
      default:"Active",
    },
    shop_name:{
        type:String,
    },
    shop_address:{
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellers", customerSchema);
