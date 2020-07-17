const express = require('express')
const Router = express.Router()
const bodypaser = require('body-parser')
const mongoose = require('mongoose');
const model = require('./model')
const jwt = require('jsonwebtoken')
mongoose.connect("mongodb://localhost:27017/sky", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);


Router.use(bodypaser.json())
//FIND ALL
Router.get('/', (req, res) => {

    model.Service.find((err, services) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(services)
    })


});

// FIND ONE
Router.get('/:id', (req, res) => {
    console.log(req.params.id)
    model.Service.findById(req.params.id, (err, service) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(service)
    })


});





//ADD ONE
Router.post('/add', (req, res) => {

    var service = new model.Service({
        Service_Category_Id: req.body.Service_Category_Id,
        Service_Status: req.body.Service_Status,
        Service_Car_No: req.body.Service_Car_No,
        Service_Customer_Id: req.body.Service_Customer_Id,
      
        Service_Paid_Status: req.body.Service_Paid_Status
    });
    console.log(service.Service_Car_No);
    let p = service.save();
    p.then(function (doc) {
        return res.status(201).json(doc);
    });
    p.catch(function (err) {
        return res.status(501).json({ massage: "error" });
    });

});

//UPDATE ONE
Router.put('/edit/:id', (req, res) => {
   
    model.Service.findById(req.params.id, (err, service) => {

        if (err) {
            return res.json({ message: 'error' })
        }
        if (req.body.Service_Category_Id) {
            service.Service_Category_Id == req.body.Service_Category_Id
        }
        if (req.body.Service_Status) {
            service.Service_Status = req.body.Service_Status
        }
        if (req.body.Service_Car_No) {
            service.Service_Car_No = req.body.Service_Car_No
        }
        if (req.body.Service_Customer_Id) {
            service.Service_Customer_Id = req.body.Service_Customer_Id
        }
        if (req.body.Service_Worker_Id) {
            service.Service_Worker_Id = req.body.Service_Worker_Id
        }
        if (req.body.Service_Paid_Status) {
            service.Service_Paid_Status = req.body.Service_Paid_Status
        }
        console.log(service)
        service.save().then((doc) => { return res.json(doc) }).catch(() => { return res.json({ message: 'error' }) })
    })
});

// DELETE ONE
Router.delete('/delete/:id', (req, res) => {
    model.Service.findOneAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(user)
    })

});

//Services by id
Router.get('/servicebyid/:id', (req, res) => {
    model.Service.find({Service_Customer_Id:req.params.id}, (err, user) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(user)
    })

});

//service by id and payment rest
Router.get('/servicebyidrest/:id', (req, res) => {
    model.Service.find({Service_Customer_Id:req.params.id,Service_Paid_Status:false,Service_Bill:false}, (err, user) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(user)
    })

});

module.exports = Router