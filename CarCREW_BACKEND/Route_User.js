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

    model.User.find((err, users) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(users)
    })


});

// FIND ONE
Router.get('/:id', (req, res) => {
    console.log(req.params.id)
    model.User.findById(req.params.id).then(users => {
      
        return res.json(users)
    }).catch( err=> { return res.json({ message: 'error' }) })


});

//ADD ONE
Router.post('/add', (req, res) => {

    var user = new model.User({
        User_Name: req.body.User_Name,
        User_Email: req.body.User_Email,
        User_Password: req.body.User_Password,
        User_Mobile_No:req.body.User_Mobile_No,
        User_Address:req.body.User_Address
    });
    console.log(user.User_Name);
    let p = user.save();
    p.then(function (doc) {
        return res.status(201).json(doc);
    });
    p.catch(function (err) {
        return res.status(501).json({ massage: "error" });
    });

});

//UPDATE ONE
Router.put('/edit/:id', (req, res) => {
    model.User.findById(req.params.id, (err, user) => {
       
        if (err) {
            return res.json({ message: 'error' })
        }
        if (req.body.User_Name) {
            user.User_Name = req.body.User_Name;
        }
        if (req.body.User_Password) {
            user.User_Password = req.body.User_Password;
        }
        if (req.body.User_Mobile_No) {
            user.User_Mobile_No = req.body.User_Mobile_No
        }
        if (req.body.User_Address) {
            user.User_Address = req.body.User_Address
        }
        if(req.body.User_Role)
        {
            user.User_Role=req.body.User_Role
        }
        user.User_Email=req.body.User_Email
        console.log(user)
        user.save().then((doc) => { return res.json(doc) }).catch(() => { return res.json({ message: 'error' }) })
    })
});

// DELETE ONE
Router.delete('/delete/:id', (req, res) => {
    model.User.findOneAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(user)
    })

});

module.exports = Router