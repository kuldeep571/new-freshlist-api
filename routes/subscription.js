const express= require("express");
const router = express.Router();



const {
    addsubscription,
}=require('../controller/subscription');








router.post('/admin/addsubscription', addsubscription);


module.exports = router;