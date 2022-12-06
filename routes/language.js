const express = require("express");
const router = express.Router();



const{
    add_language,
    language_list,
    del_language,
    edit_language,
    viewone_language,
}=require('../controller/language');

router.post('/admin/add_language', add_language);

router.get('/admin/language_list', language_list);

router.delete('/admin/del_language/:id', del_language);

router.post('/admin/edit_language/:id', edit_language);

router.get('/admin/viewone_language/:id', viewone_language);


module.exports = router;  