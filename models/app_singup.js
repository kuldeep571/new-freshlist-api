const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appsingupSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
    },
    cnfrmPassword: {
      type: String,
    },
    type: {
      type: String,
    },
    otp: {
      type: Number,
    },
    status:{
      type:String,
      default:"false",
    },
    alt_mobile: {
      type: Number,
    },
    alt_email: {
      type: String,
    },
    group: {
      type: String,
    },
    latitude:{
      type: String,
    },
    longitude:{
      type:String,
    },
    name:{
      type: String,
    },
    city:{
      type: String,
    },
    door_number:{
      type: String,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("appsingup", appsingupSchema);
