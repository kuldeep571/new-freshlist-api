const express= require("express");
const router = express.Router();



const {
    addorder,
    allorder_list,
    viewone_order,
    del_order,
    edit_order,
    pending_order,
    complete_order,
    delivery_order,
    total_order,
    cancel_order,
    dailybyselse,
  
}=require('../controller/order');


router.post('/admin/addorder', addorder);

router.get('/admin/allorder_list', allorder_list);

router.get('/admin/viewone_order/:id', viewone_order);

router.delete('/admin/del_order/:id', del_order);   

router.post('/admin/edit_order/:id', edit_order);   

router.get('/admin/pending_order', pending_order);   

router.get('/admin/complete_order', complete_order);  
 
router.get('/admin/delivery_order', delivery_order);   

router.get('/admin/total_order', total_order);   

router.get('/admin/cancel_order', cancel_order);   

router.get('/admin/dailybyselse', dailybyselse);

module.exports = router;