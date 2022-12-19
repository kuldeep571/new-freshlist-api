const cart = require('../models/shop_cart');

exports.add_cart = async (req, res)=>{
    const {
        product,
        unit_price,
        quantity,
        subtotal,
    }=req.body;

    const newcart = new cart({
        product: product,
        unit_price: unit_price,
        quantity: quantity,
        subtotal: subtotal,
    })
    newcart
    .save()
    .then((newcart)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: newcart
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

exports.allcart = async(req, res)=>{
    const getalldata = await cart.find().sort({sortorder: 1})
    .populate("product")
    if(getalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: getalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg:"error",
            error: "error",
        })
    }
}

exports.remove_cart = async(req, res)=>{
    const deletedata = await cart.deleteOne({_id: req.params.id})
    if(deletedata){
        res.status(200).json({
            status: true,
            msg:"success",
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