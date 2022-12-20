const express = require('express');
const router = express.Router();


const {
    addwallet,
    get_wallet
}=require('../controller/wallet');



router.post('/admin/addwallet', addwallet);

router.get('/admin/get_wallet', get_wallet);





module.exports = router;