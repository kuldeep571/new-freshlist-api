const express = require("express");
const router = express.Router();

const{
    addcolor,
    getall_color,
    viewone_color,
    del_color,
    edit_color,
   
}=require('../controller/color');


router.post('/admin/addcolor', addcolor);

router.get('/admin/getall_color', getall_color);

router.get('/admin/viewone_color/:id', viewone_color);

router.delete('/admin/del_color/:id', del_color);

router.post('/admin/edit_color/:id', edit_color);

module.exports = router;  