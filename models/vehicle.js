const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newvehicleSchema = Schema(
    {
        rc:{
            type: String,
        },
        insurance:{
            type: String,
        },
        license:{
            type: String,
        },
        driver_img:{
            type: String,
        },
    },
    {timestamps: true},
    
)

module.exports = mongoose.model("vehicle", newvehicleSchema);