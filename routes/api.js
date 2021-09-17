const express = require('express');
const router = express.Router();

const dotenv = require('dotenv').config();
console.log(process.env.URL);

//GET Operation
router.get('/inpet',function(req,res){
    res.send({type: 'GET'});
});

//POST Request
router.post('/inpet', function(req, res){
    res.send({
        type: 'POST',
        item: req.body.name,
        id: req.body.id
    });
});

module.exports = router;