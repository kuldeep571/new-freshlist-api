const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const languageSchema = new Schema(
    {
        language_name:{
            type: String,
        },
    },
    {timestamps: true}
);


module.exports = mongoose.model("languages", languageSchema)