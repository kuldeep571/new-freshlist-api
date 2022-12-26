const pincode = require("../models/pincode");

exports.addpincode = async(req, res)=>{

    const{
        title,
        start_date,
        end_date,
        status,
    }=req.body;

    const newaddpin = new pincode({
        title: title,
        start_date: start_date,
        end_date: end_date,
        status: status,
    });
    newaddpin.save()
    .then((newaddpin)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: newaddpin,
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

exports.getall_pincode = async(req, res)=>{
    const findexist = await pincode.find().sort({sortorder: 1});
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

exports.del_pincode = async(req, res)=>{
    const deletedata = await pincode.deleteOne({_id: req.params.id})
    if(deletedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    }else(
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    )
}

exports.viewone_pincode = async(req, res)=>{
    const findexist = await pincode.findOne({_id: req.params.id})
    if(findexist){
        res.status(200).json({
            statu: true,
            msg: "success",
            data:findexist,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}