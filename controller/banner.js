const banner = require('../models/banner');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { find } = require('../models/user');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_banner = async (req, res) => {
    const {
        banner_title,
        banner_img,
        banner_url,
        banner_type,
        status,
    } = req.body;

    const newbanner = new banner({
        banner_title: banner_title,
        banner_img: banner_img,
        banner_url: banner_url,
        banner_type: banner_type,
        status: status,
    })
    console.log("newbanner", newbanner);
    // const findexist = await banner.findOne({banner_title: banner_title});
    // if(findexist){
    //     res.status(403).json({
    //         status:true,
    //         msg:"Allready exist",
    //         data: {},
    //     })
    // } else{
    if (req.files) {
        if (req.files.banner_img[0].path) {
            alluploads = [];
            for (let i = 0; i < req.files.banner_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.banner_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.banner_img[i].path);
                alluploads.push(resp.secure_url);
            }
            newbanner.banner_img = alluploads;
        }
    }
    newbanner
        .save()
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
// }


exports.getall_banner = async (req, res)=>{
    const findalldata = await banner.find().sort({sortorder: 1})
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
            error: "error",
        })
    }
}

exports.viewone_banner = async (req, res)=>{
    const findsingle = await banner.findOne({_id: req.params.id});
    if(findsingle){
        res.status(200).json({
            status: true,
            msg: "success",
            data:findsingle,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.getbannerbytype = async(req, res)=>{
    const getbybanner = await banner.find({banner_type: req.params.banner_type}).sort({
        sortorder: 1,
    })
    if(getbybanner){
        res.status(200).json({
            status: true,
            msg: "success",
            data: getbybanner,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }

}

exports.del_banner = async (req, res)=>{
    const deletedata = await banner.deleteOne({_id: req.params.id})
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












