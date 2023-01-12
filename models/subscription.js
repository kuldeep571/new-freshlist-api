const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsubscriptionSchema = new Schema(
    {
        date_add:{
            type: String,
        },
        subscribed_product:{
            type: String,
        },
        validity:{
            type: String,
        },
        Status:{
            type: String,
            default: "Active",
        },
    },
    {timeseries: true},
)

module.exports = mongoose.model("subscription", newsubscriptionSchema);