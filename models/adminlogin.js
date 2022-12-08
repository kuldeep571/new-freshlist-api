const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
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
      image: {
        type: String,
      },
      password: {
        type: String,
      },
      cnfrmPassword: {
        type: String,
      },
      country :{
        type:String,
      },
      state:{
        type:String,
      },
      city:{
        type:String,
      },
      image:{
        type: String,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminlogins", adminSchema);
