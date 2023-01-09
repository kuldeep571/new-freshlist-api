const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const add_driverSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", add_driverSchema);
