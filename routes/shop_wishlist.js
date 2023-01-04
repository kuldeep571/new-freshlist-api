const express = require('express');
const router = express.Router();

const{
    addwishlist,
    all_wishlist,
    remove_wishlist,
}=require('../controller/shop_wishlist');


router.post('/admin/addwishlist', addwishlist);

router.get('/admin/all_wishlist/:id', all_wishlist);

router.delete('/admin/remove_wishlist/:id', remove_wishlist);








module.exports = router;