const express = require('express');
const routes = express.Router();

const{
    add_cart,
    allcart,
    remove_cart,

}=require('../controller/shop_cart');

routes.post("/admin/add_cart", add_cart);

routes.get("/admin/allcart", allcart);

routes.delete("/admin/remove_cart/:id", remove_cart);


module.exports = routes;