const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {db, users, suppliers, customers} = require('../schemas/users');


function getModel(mode, incommingdata){
    return new mode({
        SName: incommingdata.SName,
        SID: incommingdata.SID,
        SEmail: incommingdata.SEmail,
        SPhone: incommingdata.SPhone,
        SAdress: incommingdata.SAdress,
        Contact: incommingdata.Contact,
        SGSTIN: incommingdata.SGSTIN,
        BankingDetails: incommingdata.BankingDetails ,
        Nature: incommingdata.Nature
     });
}
//GET Operation
router.get('/get/suppliers', async function(req,res){
    let data = await suppliers.find({}).exec();
    res.status(200).send(data);
});

router.get('/get/customers', async function(req,res){
    let data = await customers.find({}).exec();
    res.status(200).send(data);
});

router.post('/add/supplier', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = getModel(suppliers, incommingdata);
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

router.post('/add/supplier', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = getModel(customers, incommingdata);
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