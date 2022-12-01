const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", customerSchema);
