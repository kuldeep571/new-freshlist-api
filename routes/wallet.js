const express = require('express');
const router = express.Router();


const {
    addwallet,
    get_wallet,
    viewone_wallet,
    del_wallet,
    edit_wallet
}=require('../controller/wallet');



router.post('/admin/addwallet', addwallet);

router.get('/admin/get_wallet', get_wallet);

router.get('/admin/viewone_wallet/:id', viewone_wallet);

router.delete('/admin/del_wallet/:id', del_wallet);

router.post('/admin/edit_wallet/:id', edit_wallet);





module.exports = router;