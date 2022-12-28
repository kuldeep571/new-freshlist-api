const coupon = require('../models/coupon_code');


exports.add_coupon = async(req, res)=>{

    const {
        coupon_type,
        coupon_title,
        coupon_code,
        limit_user,
        discount_type,
        discount_amount,
        min_purchase,
        start_date,
        end_date,
        status,
    }=req.body;
    
    const newcoupondata = new coupon({
        coupon_type: coupon_type,
        coupon_title: coupon_title,
        coupon_code: coupon_code,
        limit_user: limit_user,
        discount_type: discount_type,
        discount_amount: discount_amount,
        min_purchase: min_purchase,
        start_date: start_date,
        end_date: end_date,
        status: status,
    })
    newcoupondata.save()
    .then((newcoupondata)=>{
        res.status(200).json({
            status: true,
            mag: "success",
            data: newcoupondata,
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


exports.coupon_list = async(req, res)=>{

    const findexist = await coupon.find().sort({sortorder: 1})
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

exports.viewone_coupon = async(req, res)=>{
    const findsingle_data = await coupon.findOne({_id: req.params.id})
    if(findsingle_data){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findsingle_data,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.del_coupon = async(req, res)=>{
    const deleteone = await coupon.deleteOne({_id: req.params.id})
    if(deleteone){
        if(deleteone){
            res.status(200).json({
                status: true,
                msg: "success",
                data: deleteone,
            })
        }else{
            res.status(400).json({
                status: false,
                mag: "error",
                error: "error",
            });
        }
    }
}


exports.edit_coupon = async(req, res)=>{
    const updatesingle_data = await coupon.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new : true},
    )
    .then((updatesingle_data)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: updatesingle_data,
        })
    })
    .catch((error)=>{
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        });
    })
}
