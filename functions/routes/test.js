const express = require('express');
const router = express.Router();


router.get('/', (req,resp) => {
    console.log('WOWOWOWOW')  
    resp.status(200).send('ok') 
})

module.exports = router;
