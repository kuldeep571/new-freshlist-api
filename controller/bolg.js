const blog = require('../models/blog');
const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


exports.addblog = async (req, res)=>{
    const {
        thumbnail_img,
        title,
        desc,
        date,
    }=req.body;

    const newaddblog = new blog({
        thumbnail_img: thumbnail_img,
        title: title,
        desc :desc,
        date: date
    })
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        if(result){
            newaddblog.thumbnail_img = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        newaddblog.save()
        .then((newaddblog)=>{
            res.status(200).json({
                status: true,
                msg: "success",
                data: newaddblog,
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

exports.getall_blog = async(req, res)=>{
    const findexist = await blog.find().sort({sortorder: 1})
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

exports.viewone_blog = async(req, res)=>{
    const findonedata = await blog.findOne({_id: req.params.id})
    if(findonedata){
        res.status(200).json({
            status: true,
            msg:"success",
            data: findonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_blog = async (req, res)=>{
    const deletedata = await blog.deleteOne({_id: req.params.id})
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
            error: "error",
        })
    }
}

exports.editblog = async(req, res)=>{
    const {
        thumbnail_img,
        title,
        desc,
        date
    }=req.body;

    data={};
    if(thumbnail_img){
        data.thumbnail_img = thumbnail_img;
    }
    if(title){
        data.title = title;
    }
    if(desc){
        data.desc = desc;
    }
    if(date){
        data.date = date;
    }

    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        if(result){
            data.thumbnail_img = result.secure_url;
            fs.unlinkSync(req.file.path)
        }
    }
    if(data){
        const updateone = await blog.findOneAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true}
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
                error: "error",
            })
        }
    }
}