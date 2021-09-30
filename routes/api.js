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
        SAddress: incommingdata.SAddress,
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

router.delete('/delete/supplier/:id', async function(req, res){
    var id = req.params.id;
        await suppliers.findByIdAndDelete(id,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.delete('/delete/customer/:id', async function(req, res){
    var id = req.params.id;
        await customers.findByIdAndDelete(id,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.post('/add/supplier', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = getModel(suppliers, incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.post('/add/customers', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = getModel(customers, incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.put('/edit/supplier/:id/:sid', async function(req, res, next){
    let id = req.params.id;
    let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id, SID: oldSid};
    let update = {
        SName: incommingdata.SName,
        SID: incommingdata.SID,
        SEmail: incommingdata.SEmail,
        SPhone: incommingdata.SPhone,
        SAddress: incommingdata.SAddress,
        Contact: incommingdata.Contact,
        SGSTIN: incommingdata.SGSTIN,
        BankingDetails: incommingdata.BankingDetails ,
        Nature: incommingdata.Nature
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await suppliers.findOneAndUpdate(query,update,options,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.put('/edit/customer/:id/:sid', async function(req, res, next){
    let id = req.params.id;
    let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id, SID: oldSid};
    let update = {
        SName: incommingdata.SName,
        SID: incommingdata.SID,
        SEmail: incommingdata.SEmail,
        SPhone: incommingdata.SPhone,
        SAddress: incommingdata.SAddress,
        Contact: incommingdata.Contact,
        SGSTIN: incommingdata.SGSTIN,
        BankingDetails: incommingdata.BankingDetails ,
        Nature: incommingdata.Nature
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await customers.findOneAndUpdate(query,update,options,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
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