const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('app/home');
});


module.exports = router;