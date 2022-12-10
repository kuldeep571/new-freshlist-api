const language = require('../models/language');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



exports.add_language = async (req, res)=>{
    const {lang_name, image, status}=req.body;

    const newlanguage = new language({
        lang_name:lang_name,
        image: image,
        status: status,
    })
    // const findexist = await language.findOne({lang_name: lang_name});
    // if(findexist){
    //     res.status(403).json({
    //         status: false,
    //         msg: "Allready exist",
    //         data: {},
    //     })
    // }else{
        if (req.files) {
            if (req.files.image[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.image.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.image[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.image[i].path);
                alluploads.push(resp.secure_url);
              }
              newlanguage.image = alluploads;
            }
          }
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
// }

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
