const express = require('express');
const routes = express.Router();

const{
    add_cart,
    allcart,
    remove_cart,
    viewone_cart,

}=require('../controller/shop_cart');

routes.post("/admin/add_cart", add_cart);

routes.get("/admin/allcart", allcart);

routes.get("/admin/viewone_cart/:id", viewone_cart);

routes.delete("/admin/remove_cart/:id", remove_cart);


module.exports = routes;