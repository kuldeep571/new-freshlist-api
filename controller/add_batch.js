const addbatches = require("../models/add_batch");


exports.addbatch = async (req, res) => {
    const { batch_no, rack_no, shelf_life, expiry_date, stock, notify, status } = req.body;

    const newaddbatch = new addbatches({
        batch_no: batch_no,
        rack_no: rack_no,
        shelf_life: shelf_life,
        expiry_date: expiry_date,
        stock: stock,
        notify: notify,
        status: status,
    });

    const findexist = await addbatches.findOne({ batch_no: batch_no })
    if (findexist) {
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }
    newaddbatch
        .save()
        .then((data) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: data,
            })
        })
        .catch((error) => {
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            })
        })
}

exports.getall_batch = async (req, res) => {
    const findall = await addbatches.find().sort({ sortorder: 1 })
    if (findall) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.viewone_addbatch = async (req, res) => {
    const findexist = await addbatches.findOne({ _id: req.params.id })
    if (findexist) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}


exports.delete_batch = async (req, res) => {
    const deletedata = await addbatches.deleteOne({ _id: req.params.id });
    if (deletedata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.edit_batch = async (req, res) => {
    //    const{batch_no,
    //         rack_no,
    //         shelf_life,
    //         expiry_date,
    //         stock, 
    //         notify}=req.body;

    //         data={};
    //         if(batch_no){
    //             data.batch_no= batch_no;
    //         }
    //         if(rack_no){
    //             data.rack_no = rack_no;
    //         }
    //         if(shelf_life){
    //             data.shelf_life = shelf_life;
    //         }
    //         if(expiry_date){
    //             data.expiry_date= expiry_date;
    //         }
    //         if(stock){
    //             data.stock= stock;
    //         }
    //         if(notify){
    //             data.notify=notify;
    //         }

    const updateonedata = await addbatches.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
    )
    if (updateonedata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: updateonedata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
        })
    }
}