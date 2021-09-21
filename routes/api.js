const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {db, users, suppliers} = require('../schemas/users');


//GET Operation
router.get('/get/suppliers', async function(req,res){
    let data = await suppliers.find({}).exec();
    res.status(200).send(data);
});

router.post('/add/supplier', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = new suppliers({
       SName: incommingdata.SName,
       SID: incommingdata.SID,
       SEmail: incommingdata.SEmail,
       SPhone: incommingdata.SPhone,
       SAdress: incommingdata.SAdress,
       Contact: incommingdata.Contact,
       SGSTIN: incommingdata.SGSTIN,
       BankingDetails: incommingdata.BankingDetails ,
       Nature: incommingdata.Nature
    })
    try {
        await TobeInserted.save(function(err, resp){
            if (err) throw err;
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
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