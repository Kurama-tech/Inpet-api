const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const {db, users, suppliers, customers, categories, termination, inventory} = require('../schemas/users');


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

function getInventoryModel(incommingdata){
    return new inventory({
        Date: incommingdata.Date,
        Name: incommingdata.Name,
        PO: incommingdata.PO,
        BillNo: incommingdata.BillNo,
        BDate: incommingdata.BDate,
        TotalNumberEntries: incommingdata.TotalNumberEntries,
        EntryNumber: incommingdata.EntryNumber,
        Category: incommingdata.Category,
        SubCat: incommingdata.SubCat,
        Termination: incommingdata.Termination,
        Package: incommingdata.Package,
        PartNo: incommingdata.PartNo,
        Make: incommingdata.Make,
        Description: incommingdata.Description,
        Value: incommingdata.Value,
        Comments: incommingdata.Comments,
        Quantity: incommingdata.Quantity,
        TotalQATM: incommingdata.TotalQATM
    })
}

function categoriesModel(incommingdata) {
    return new categories({
        name: incommingdata.name,
        SubCat: incommingdata.SubCat
    })
}

function terminationModel(incommingdata) {
    return new termination({
        name: incommingdata.name
    })
}

function packageModel(incommingdata) {
    return new package({
        name: incommingdata.name
    })
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

router.get('/get/categories', async function(req,res){
    let data = await categories.find({}).exec();
    res.status(200).send(data);
});

router.get('/get/termination', async function(req,res){
    let data = await termination.find({}).exec();
    res.status(200).send(data);
});

router.get('/get/package', async function(req,res){
    let data = await package.find({}).exec();
    res.status(200).send(data);
});

router.get('/get/inventory/all', async function(req,res){
    let data = await inventory.find({}).exec();
    res.status(200).send(data);
});

router.get('/get/inventory/:value/:description', async function(req,res){
    let data = await inventory.find({Value: req.params.value, Description: req.params.description}).exec();
    let countQTY = 0
    data.forEach((value)=>{
        countQTY = countQTY + value.Quantity 
    })
    const result = {
        "totalQTY": countQTY,
        "data": data
    }
    res.status(200).send(result);
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

router.delete('/delete/category/:id', async function(req, res){
    var id = req.params.id;
        await categories.findByIdAndDelete(id,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.delete('/delete/termination/:id', async function(req, res){
    var id = req.params.id;
        await termination.findByIdAndDelete(id,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.delete('/delete/package/:id', async function(req, res){
    var id = req.params.id;
        await package.findByIdAndDelete(id,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.delete('/delete/inventoryEntry/:id', async function(req, res){
    var id = req.params.id;
        await package.findByIdAndDelete(id,function(err, resp){
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
            console.log(err)
            console.log(resp)
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.post('/add/inventoryEntry', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = getInventoryModel(incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            console.log(err)
            console.log(resp)
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.post('/add/category', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = categoriesModel(incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            console.log(err)
            console.log(resp)
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.post('/add/termination', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = terminationModel(incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            console.log(err)
            console.log(resp)
            if (err) res.status(400).send("unwanted error!! "+ err.message);
            console.log("inserted one record: "+ resp);
            res.status(200).send(resp);
        });
    } catch (error) {
        res.status(408).send("unwanted error!! "+ error);
    } 
});

router.post('/add/package', async function(req, res, next){
    let incommingdata = req.body
    console.log(typeof(incommingdata))
    var TobeInserted = packageModel(incommingdata);
    console.log(TobeInserted);
    try {
        await TobeInserted.save(function(err, resp){
            console.log(err)
            console.log(resp)
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
            console.log(err)
            console.log(resp)
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

router.put('/edit/inventory/:id', async function(req, res, next){
    let id = req.params.id;
    //let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id, SID: oldSid};
    let update = {
        Date: incommingdata.Date,
        Name: incommingdata.Name,
        PO: incommingdata.PO,
        BillNo: incommingdata.BillNo,
        BDate: incommingdata.BDate,
        TotalNumberEntries: incommingdata.TotalNumberEntries,
        EntryNumber: incommingdata.EntryNumber,
        Category: incommingdata.Category,
        SubCat: incommingdata.SubCat,
        Termination: incommingdata.Termination,
        Package: incommingdata.Package,
        PartNo: incommingdata.PartNo,
        Make: incommingdata.Make,
        Description: incommingdata.Description,
        Value: incommingdata.Value,
        Comments: incommingdata.Comments,
        Quantity: incommingdata.Quantity,
        TotalQATM: incommingdata.TotalQATM
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await inventory.findOneAndUpdate(query,update,options,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.put('/edit/category/:id', async function(req, res, next){
    let id = req.params.id;
    //let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id};
    let update = {
        name: incommingdata.name,
        SubCat: incommingdata.SubCat
        
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await categories.findOneAndUpdate(query,update,options,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.put('/edit/termination/:id', async function(req, res, next){
    let id = req.params.id;
    //let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id};
    let update = {
        name: incommingdata.name,
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await termination.findOneAndUpdate(query,update,options,function(err, resp){
            if (err) throw res.status(400).send("unwanted error!! "+ err.message);;
            console.log(err);
            console.log("Updated one record: "+ resp);
            res.status(200).send(resp);
        });
});

router.put('/edit/package/:id', async function(req, res, next){
    let id = req.params.id;
    //let oldSid = req.params.sid;
    let incommingdata = req.body;
    console.log(typeof(incommingdata))
    var query = {_id: id};
    let update = {
        name: incommingdata.name,
        
    };
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
        await package.findOneAndUpdate(query,update,options,function(err, resp){
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