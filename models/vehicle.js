const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newvehicleSchema = Schema(
    {
        rc:{
            type: Array,
        },
        insurance:{
            type: Array,
        },
        license:{
            type: Array,
        },
        driver_img:{
            type: Array,
        },
    },
    {timestamps: true},
    
)

module.exports = mongoose.model("vehicle", newvehicleSchema);