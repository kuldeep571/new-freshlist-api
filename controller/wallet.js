const wallet = require('../models/wallet');
const { v4: uuidv4 } = require("uuid");


exports.addwallet = async (req, res) => {
    const {
        mobile_no,
        orderId,
        name,
        wallet_type,
        amount,
        remarks
    } = req.body;

    const newdata = await wallet({
        mobile_no: mobile_no,
        orderId: "#ORDC" + Date.now(),
        name: name,
        wallet_type: wallet_type,
        amount: amount,
        remarks: remarks
    })
    newdata.save()
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


exports.get_wallet = async (req, res)=>{
    const findalldata = await wallet.find().sort({sortorder: 1})
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    }else{
        res.status(400).json({
            status : false,
            msg: "error",
            error: "error"
        })
    }
}

exports.viewone_wallet = async(req, res)=>{
    const finddata = await wallet.findOne({_id: req.params.id})
    if(finddata){
        res.status(200).json({
            status: true,
            msg: "success",
            data:finddata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error:"error",
        })
    }
}

exports.del_wallet = async(req, res)=>{
    const deletedata = await wallet.deleteOne({_id: req.params.id})
    if(deletedata){
        res.status(200).json({
            status: true,
            msg: "error",
            data: deletedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
        })
    }
}


exports.edit_wallet = async (req, res)=>{
    const findupdate = await wallet.findOneAndUpdate(
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
