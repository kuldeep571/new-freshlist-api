const attribute = require('../models/attribute');


exports.add_attribute = async (req, res) => {
    const { attribute_name } = req.body;

    const newsize = new attribute({
        attribute_name: attribute_name,
    })
    newsize
        .save()
        .then((newsize) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newsize,
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

exports.getall_attribute = async(req, res)=>{
    const findexist = await attribute.find().sort({sortorder:1})
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.del_attribute = async(req, res)=>{
    try {
        const deleteone = await attribute.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.viewone_attribute = async(req, res)=>{
    try {
        const findexist = await attribute.findOne({_id: req.params.id})
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.edit_attribute = async(req, res)=>{
    try {
        const updatedata = await attribute.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true},
        )
        res.status(200).json({
            status: true,
            msg: "success",
            data: updatedata,
        })
    }catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}