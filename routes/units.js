const express= require("express");
const router = express.Router();



const {
    addunits,
    del_units,
    getall_units,
    edit_units,
    viewone_units,
}=require('../controller/units');








router.post('/admin/addunits', addunits);

router.get('/admin/getall_units', getall_units);

router.get('/admin/viewone_units/:id', viewone_units);

router.post('/admin/edit_units/:id', edit_units);

router.delete('/admin/del_units/:id', del_units);



module.exports = router;