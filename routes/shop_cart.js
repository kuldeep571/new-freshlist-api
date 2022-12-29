const express = require('express');
const routes = express.Router();

const{
    add_cart,
    getbycart,
    remove_cart,
    viewone_cart,
    // cartbycount,
    // getbycart,
}=require('../controller/shop_cart');

routes.post("/admin/add_cart", add_cart);

routes.get("/admin/getbycart/:id", getbycart);

routes.get("/admin/viewone_cart/:id", viewone_cart);

routes.delete("/admin/remove_cart/:id", remove_cart);

// routes.get("/admin/getbycart/:id", getbycart);

// routes.get('../admin/cartbycount', cartbycount);



module.exports = routes;