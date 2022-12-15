const express= require("express");
const router = express.Router();



const {
    addorder,
    allorder_list,
    viewone_order,
    del_order,
  
}=require('../controller/order');


router.post('/admin/addorder', addorder);

router.get('/admin/allorder_list', allorder_list);

router.get('/admin/viewone_order/:id', viewone_order);

router.delete('/admin/del_order/:id', del_order);

module.exports = router;