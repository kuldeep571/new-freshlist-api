const language = require('../models/language');


exports.add_language = async (req, res)=>{
    const {language_name}=req.body;

    const newlanguage = new language({
        language_name:language_name,
    })
    const findexist = await language.findOne({language_name: language_name});
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newlanguage
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
                status:false,
                msg: "error",
                error: error,
            })
        })
    }
}

exports.language_list = async (req, res)=>{
    const findall = await language.find().sort({sortorder:1});
    if(findall){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall,
        })
    }
    else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_language = async (req, res)=>{
    const del_language = await language.deleteOne({_id: req.params.id})
    if(del_language){
        res.status(200).json({
            status: true,
            msg: "success",
            data: del_language,
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error: error,
        })
    }
}

exports.edit_language = async (req, res)=>{
    const updateone = await language.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true},
    )
    if(updateone){
        res.status(200).json({
            status: true,
            msg: "success",
            data: updateone,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error
        })
    }
}

exports.viewone_language = async (req, res)=>{
    const viewone_data = await language.findOne({_id: req.params.id})
    if(viewone_data){
        res.status(200).json({
            status: true,
            msg: "success",
            data: viewone_data,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

