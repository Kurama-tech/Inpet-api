const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {db, users} = require('../schemas/users');


//GET Operation
router.get('/inpet', async function(req,res){
    let data = await users.find({}).exec();
    res.send(data);
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