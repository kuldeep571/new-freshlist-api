const selse = require("../models/selse");

exports.add_selse = async(req, res)=>{
    const{
        product_name,
        date,
        hubs,
        total_selse,
    }=req.body;

    const newselse = new selse({
        product_name: product_name,
        date: new Date().toLocaleDateString(),
        hubs: hubs,
        total_selse: total_selse,
    })
    newselse.save()
    .then((newselse)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: newselse,
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


exports.getall_selse = async(req, res)=>{

    try {
        const findexist = await selse.find().sort({sortorder: 1})
        .populate("product_name")
        .populate("hubs")
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }catch(error){
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.viewone_selse = async(req, res)=>{
    const findexistdata = await selse.findOne({_id: req.params.id})
    .populate("product_name")
    .populate("hubs")
    if(findexistdata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexistdata,
        })
    } else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}


exports.del_selse = async(req, res)=>{
    const deleteone = await selse.deleteOne({_id: req.params.id})
    if(deleteone){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.edit_selse = async(req, res)=>{
    const findonedata = await selse.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true},
    )
    console.log("findonedata", findonedata);
    if(findonedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}