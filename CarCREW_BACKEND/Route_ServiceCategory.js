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

    model.ServiceCategory.find((err, services) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(services)
    })


});

// FIND ONE
Router.get('/:id', (req, res) => {
    console.log(req.params.id)
    model.ServiceCategory.findById(req.params.id, (err, service) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(service)
    })


});





//ADD ONE
Router.post('/add', (req, res) => {

    var servicecategory = new model.ServiceCategory({
        Service_Name: req.body.Service_Name,
        Service_Price: req.body.Service_Price,
        Service_Description: req.body.Service_Description
    });
    console.log(servicecategory.Service_Name);
    let p = servicecategory.save();
    p.then(function (doc) {
        return res.status(201).json(doc);
    });
    p.catch(function (err) {
        return res.status(501).json({ massage: "error" });
    });

});

//UPDATE ONE
Router.put('/edit/:id', (req, res) => {
    model.ServiceCategory.findById(req.params.id, (err, servicecategory) => {

        if (err) {
            return res.json({ message: 'error' })
        }
        if (req.body.Service_Name) {
            servicecategory.Service_Name = req.body.Service_Name
        }
        if (req.body.Service_Price) {
            servicecategory.Service_Price = req.body.Service_Price
        }
        if (req.body.Service_Description) {
            servicecategory.Service_Description = req.body.Service_Description
        }
        servicecategory.save().then((doc) => { return res.json(doc) }).catch(() => { return res.json({ message: 'error' }) })
    })
});

// DELETE ONE
Router.delete('/delete/:id', (req, res) => {
    model.ServiceCategory.findOneAndRemove(req.params.id, (err, servicecategory) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(servicecategory)
    })

});

module.exports = Router