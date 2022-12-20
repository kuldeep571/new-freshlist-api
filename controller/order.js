const orderproduct = require('../models/order');
const { v4: uuidv4 } = require("uuid");



exports.addorder = async (req, res)=>{

    const {
        orderId,
        orderd_from,
        phone_no,
        order_zone,
        billing_add,
        delivery_add,
        date,
        delivery_date,
        time_slot,
        items,
        assing_drive,
        notifyby_email,
        status
    }=req.body;

    const neworder = new orderproduct({
        orderId: uuidv4(),
        orderd_from: orderd_from,
        phone_no: phone_no,
        order_zone: order_zone,
        billing_add: billing_add,
        delivery_add: delivery_add,
        date: date,
        delivery_date: delivery_date,
        time_slot: time_slot,
        items: items,
        assing_drive: assing_drive,
        notifyby_email: notifyby_email,
        status: status
    })
    
    const findexist = await orderproduct.findOne({orderId: orderId })

    if(findexist){
        res.status(403).json({
            status: false,
            msg: "allready exist",
            data:{},
        })
    }else{
        neworder
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
                msg:"error",
                error: error,
            })
        })
    }
}

exports.allorder_list = async (req, res)=>{
    const getalldata = await orderproduct.find().sort({sortorder: 1})
    if(getalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: getalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_order = async (req, res)=>{
    try {
        const vieworder_data = await orderproduct.findOne({_id: req.params.id})
        res.status(200).json({
            status: true,
            msg: "success",
            data: vieworder_data,
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_order = async (req, res)=>{
    try {
        const deletedata = await orderproduct.deleteOne({_id: req.params.id})
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

