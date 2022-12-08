const size = require("../models/size");

exports.addsize = async (req, res)=>{
    const {size_name}=req.body;

    const newsize = new size({
        size_name: size_name,
    })
    const findexist = await size.findOne({size_name: size_name})
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newsize
        .save()
        .then((newsize)=>{
            res.status(200).json({
                status: true,
                msg: "success",
                data: newsize,
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
}

exports.getall_size = async (req, res)=>{
    const findalldata = await size.find().sort({sortorder: 1})
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error
        })
    }
}

exports.del_size = async (req, res)=>{
    const deletedata = await size.deleteOne({_id: req.params.id});
    if(deletedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.viewone_size = async (req, res)=>{
    const findexist = await size.findOne({_id: req.params.id})
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.edit_size = async (req, res)=>{
    const findupdate = await size.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    );
    if(findupdate){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findupdate,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}