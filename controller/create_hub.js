const createhub = require('../models/create_hub');


exports.addhub= async (req, res)=>{
    const {
        name,
        desc, 
        mobile, 
        email, 
        address, 
        delivery_zone, 
        category, 
        sub_category, 
        status}=req.body;

    const newhubdata = await createhub({
        name: name,
        desc: desc,
        mobile: mobile,
        email: email,
        address: address,
        delivery_zone: delivery_zone,
        category: category,
        sub_category: sub_category, 
        status: status,
    });

    const findexist = await createhub.findOne({email: email});
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data: {},
        })
    }
    else{
        newhubdata
        .save()
        .then((data)=>{
            res.status(200).json({
                status:true,
                msg: "success",
                data: data,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status:false,
                msg: "error",
                error: error,
            })
        })
    }
}

exports.hublist = async (req, res)=>{
    const findexist = await createhub.find()
    .sort({sortorder:1})
    .populate("category")
    .populate("sub_category")

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

exports.viewone_hub = async (req, res)=>{
    const findsingle = await createhub.findOne({_id: req.params.id})
    .populate("category")
    .populate("sub_category")
    if(findsingle){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findsingle,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.del_hub = async (req, res)=>{
    const deleteone = await createhub.deleteOne({_id: req.params.id});
    if(deleteone){
        res.status(200).json({
            status: true,
            msg: "success delete",
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

exports.edit_hub = async (req, res)=>{
    const updatedata = await createhub.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    )
    if(updatedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: updatedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}