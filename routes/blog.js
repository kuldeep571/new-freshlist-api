const express = require('express');
const router = express.Router();

const {
    addblog,
}= require('../controller/bolg');





router.post('/admin/addblog', addblog);






module.exports = router;