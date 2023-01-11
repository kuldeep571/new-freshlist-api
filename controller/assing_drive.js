const assingdrive = require('../models/assing_drive');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_drive = async (req, res) => {
    const {
        firstname,
        lastname,
        identity_type,
        identity_no,
        phone_no,
        address,
        deliveryman_img,

        identity_img
    } = req.body;

    const newdrive = assingdrive({
        firstname: firstname,
        lastname: lastname,
        identity_type: identity_type,
        identity_no: identity_no,
        phone_no: phone_no,
        address: address,
        deliveryman_img: deliveryman_img,
        identity_img: identity_img
    })
    console.log("newdrive", newdrive);
    const findexist = await assingdrive.findOne({ identity_no: identity_no });
    if (findexist) {
        res.status(403).json({
            status: false,
            msg: "Allready exit",
            data: findexist,
        })
    } else {
        if (req.files.deliveryman_img[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.deliveryman_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.deliveryman_img[i].path,
                );
                fs.unlinkSync(req.files.deliveryman_img[i].path);
                image_array.push(resp.secure_url);
            }
            newdrive.deliveryman_img = image_array;
        }

        if (req.files.identity_img[0].path) {
            alluplaod = [];
            for (let i = 0; i < req.files.identity_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.identity_img[i].path,
                );
                fs.unlinkSync(req.files.identity_img[i].path);
                alluplaod.push(result.secure_url);
            }
            newdrive.identity_img = alluplaod;
        }

        newdrive.save()
            .then((newdrive) => {
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: newdrive,
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
}

exports.getall_drive = async (req, res) => {
    const finddata = await assingdrive.find().sort({ sortorder: 1 })
    if (finddata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: finddata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_drive = async (req, res) => {
    const findonedata = await assingdrive.findOne({ _id: req.params.id });
    if (findonedata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_drive = async (req, res) => {
    const deleteone = await assingdrive.deleteOne({ _id: req.params.id });
    if (deleteone) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.edit_drive = async (req, res) => {
    const {
        firstname,
        lastname,
        identity_type,
        identity_no,
        phone_no,
        address,
        deliveryman_img,
        identity_img
    } = req.body;

    data = {};
    if (firstname) {
        data.firstname = firstname;
    }
    if (lastname) {
        data.lastname = lastname;
    }
    if (identity_type) {
        data.identity_type = identity_type;
    }
    if (identity_no) {
        data.identity_no = identity_no;
    }
    if (phone_no) {
        data.phone_no = phone_no;
    }
    if (address) {
        data.address = address;
    }
    if (deliveryman_img) {
        data.deliveryman_img = deliveryman_img;
    }
    if (identity_img) {
        data.identity_img = identity_img;
    }

    // multipal image update

    if (req.files) {
        if (req.files.deliveryman_img) {
            alluploads = [];
            for (let i = 0; i < req.files.deliveryman_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.deliveryman_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.deliveryman_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.deliveryman_img = alluploads;
        }

        if (req.files.identity_img) {
            alluploads = [];
            for (let i = 0; i < req.files.identity_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.identity_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.identity_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.identity_img = alluploads;
        }
    }
    if (data) {
        const updatedata = await assingdrive.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true }
        )
        if (updatedata) {
            res.status(200).json({
                status: true,
                msg: "success",
                data: updatedata,
            })
        } else {
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
    }
}



exports.account_information = async (req, res) => {
    const {
        email,
        password,
        cnfrmPassword,
        status,
    } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(password, salt);

    if (password == cnfrmPassword) {

        const newCustomer = new assingdrive({
            email: email,
            password: hashpassword,
            cnfrmPassword: hashpassword,
            status: status,
        });
        newCustomer.save()
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
                });
            });
    } else {
        res.status(403).json({
            status: false,
            msg: "password is not match",
        })
    }
};
