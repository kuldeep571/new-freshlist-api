const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languageSchema = new Schema(
    {
        lang_name:{
            type: String,
        },
        image:{
            type: Array,
        },
    },
    {timestamps: true}
);


module.exports = mongoose.model("languages", languageSchema)