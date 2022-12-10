const addbatches = require("../models/add_batch");


exports.addbatch = async (req, res)=>{
    const {batch_no, rack_no, shelf_life, expiry_date, stock, notify}=req.body;

    const newaddbatch = new addbatches({
        batch_no: batch_no,
        rack_no: rack_no,
        shelf_life: shelf_life,
        expiry_date: expiry_date,
        stock: stock,
        notify: notify,
    });

    const findexist = await addbatches.findOne({batch_no: batch_no})
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }
    newaddbatch
    .save()
    .then((data)=>{
        res.status(200).json({
           status: true,
           msg:"success",
           data: data,
        })
    })
    .catch((error)=>{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    })
}