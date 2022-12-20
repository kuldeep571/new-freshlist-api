const wallet = require('../models/wallet');
const { v4: uuidv4 } = require("uuid");



exports.addwallet = async (req, res) => {
    const {
        mobile_no,
        orderId,
        name,
        payment_type,
        amount,
        remarks
    } = req.body;

    const newdata = await wallet({
        mobile_no: mobile_no,
        orderId: uuidv4(),
        name: name,
        payment_type: payment_type,
        amount: amount,
        remarks: remarks
    })
    newdata.save()
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


exports.get_wallet = async (req, res)=>{
    const findalldata = await wallet.find().sort({sortorder: 1})
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    }else{
        res.status(400).json({
            status : false,
            msg: "error",
            error: "error"
        })
    }
}

