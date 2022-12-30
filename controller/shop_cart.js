const cart = require('../models/shop_cart');
const product = require('../models/product');

exports.add_cart = async (req, res)=>{
    const{
        customer,
        product,
        unit_price,
        quantity,
        subtotal,
    }=req.body;

    const newcart = new cart({
        customer: customer,
        product: product,
        unit_price: unit_price,
        quantity: quantity,
        subtotal: subtotal,
    })
    console.log("newcart", newcart);
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

exports.getbycart = async(req, res)=>{
    const getalldata = await cart.find({customer: req.params.id})
    .populate("product")
    console.log("getalldata", getalldata)
    if(getalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            length: getalldata.length,
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


exports.viewone_cart = async(req, res)=>{
    const findonedata = await cart.findOne({_id: req.params.id})
    .populate("product");
    if(findonedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
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

// exports.getbycart = async(req, res)=>{
//     const findone = await cart.find({customer: req.params.id}).count();
//     // if(findone){
//     //     const findexist = await product.find({product: req.params.id})
//     //     console.log("findexist", findexist);
//     //     const data = findexist.value;

//     //     console.log(data,"data");
//     // }
//     console.log("findone", findone)
// }