const color = require("../models/color"); 

exports.addcolor = async (req, res)=>{
    const {color_name}=req.body;
    
    const newcolordata = new color({
        color_name: color_name, 
    });

    const findexist = await color.findOne({color_name: color_name});
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newcolordata
        .save()
        .then((data)=>{
            res.status(200).json({
                status: true,
                msg: "success",
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
     
}

exports.getall_color = async (req, res)=>{
    const findall = await color.find().sort({sortorder: 1})
    if(findall){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}


exports.viewone_color = async (req, res)=>{
    const findexist = await color.findOne({_id: req.params.id})
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
            error: error,
        })
    }
}

exports.del_color = async (req, res)=>{
    const deletedata = await color.deleteOne({_id: req.params.id})
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
            error: error
        })
    }
}

exports.edit_color = async (req, res)=>{
    const findupdate = await color.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new : true},
        );
    if(findupdate){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findupdate,
        })
    }else{
        res.status(403).json({
            status: false,
            msg: "error",
            error: error
        });
    }
}