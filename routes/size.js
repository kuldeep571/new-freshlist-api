const express= require("express");
const router = express.Router();



const {
    addsize,
    getall_size,
    del_size,
    viewone_size,
    edit_size,
  
}=require('../controller/size');


router.post('/admin/addsize', addsize);

router.get('/admin/getall_size', getall_size);

router.delete('/admin/del_size/:id', del_size);

router.get('/admin/viewone_size/:id', viewone_size);

router.post('/admin/edit_size/:id', edit_size);


module.exports = router;