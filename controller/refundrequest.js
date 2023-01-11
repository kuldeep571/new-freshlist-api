const refund = require('../models/refundrequest');

exports.addrefund = async(req, res)=>{
    const{
        orderId,
        customer_name,
        mobile_no,
        email,
        unit_price,
        time_slot,
        product_name,
        total_quantity,
        total_price,
        payment,
        payment_status,
        product_status,
        reason,
    }=req.body;

    const newaddrefund = refund({
        orderId: orderId,
        customer_name: customer_name,
        mobile_no: mobile_no,
        email: email,
        unit_price: unit_price,
        time_slot: time_slot,
        product_name: product_name,
        total_quantity: total_quantity,
        total_price: total_price,
        payment: payment,
        payment_status: payment_status,
        product_status: product_status,
        reason: reason,
    })

    newaddrefund.save()
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