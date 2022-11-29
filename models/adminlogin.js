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
     
    //   status:{
    //     type:Boolean,
    //     default:false,
    //   }

  },
  { timestamps: true }
);

module.exports = mongoose.model("adminlogins", adminSchema);
