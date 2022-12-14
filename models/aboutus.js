const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutschema = new Schema(
    {
        aboutus_title:{
            type:String,
        },
        display:{
            type:String,
        },
        sortorder:{
            type: Number,
        },
        status:{
            type:String,
        },
    },
  { timestamps: true }
  
);

module.exports=mongoose.model("Aboutus", aboutschema);