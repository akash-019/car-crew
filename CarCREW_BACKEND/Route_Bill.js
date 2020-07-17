const express = require('express')
const Router = express.Router()
const bodypaser = require('body-parser')
const mongoose = require('mongoose');
const model = require('./model')
const jwt = require('jsonwebtoken')
var nodemailer= require('nodemailer');

mongoose.connect("mongodb://localhost:27017/sky", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);


Router.use(bodypaser.json())
//FIND ALL
Router.get('/', (req, res) => {

    model.Bill.find((err, bill) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(bill)
    })


});

// FIND ONE
Router.get('/:id', (req, res) => {
    console.log(req.params.id)
    model.Bill.findById(req.params.id, (err, bill) => {
        if (err) { return res.json({ message: 'error' }) }
        return res.json(bill)
    })


});





//ADD ONE
Router.post('/add', (req, res) => {

    var bill = new model.Bill({
        Bill_Service_Id: req.body.Bill_Service_Id,
        Bill_Customer_Id: req.body.Bill_Customer_Id
    });
    console.log(bill);
    let p = bill.save();
    p.then(function (doc) {
        return res.status(201).json(doc);
    });
    p.catch(function (err) {
        return res.status(501).json({ massage: "error" });
    });

});

//UPDATE ONE
Router.put('/edit/:id', (req, res) => {
    model.Bill.findById(req.params.id, (err, bill) => {

        if (err) {
            return res.json({ message: 'error' })
        }
        if (req.body.Bill_Service_Id) {
            bill.Bill_Service_Id = req.body.Bill_Service_Id
        }
        if (req.body.Bill_Customer_Id) {
            bill.Bill_Customer_Id = req.body.Bill_Customer_Id
        }
        bill.save().then((doc) => { return res.json(doc) }).catch(() => { return res.json({ message: 'error' }) })
    })
});

// DELETE ONE
Router.delete('/delete/:id', (req, res) => {
    model.Bill.findOneAndRemove(req.params.id, (err, bill) => {
        if (err) {
            return res.json({ message: 'error' })
        }
        return res.json(bill)
    })

});


Router.get('/sendemail/:id', (req, res) => {
    var user, bills;
    
    var serve = [];
    
    console.log(req.params.id)
    model.Bill.findById(req.params.id).then(bill=>{bills = bill
    
        model.User.findById(bills.Bill_Customer_Id).then(users => {
            user = users
            console.log(user)

        })
        let amt = 0;
        bills.Bill_Service_Id.forEach(element => {

            model.Service.findById({ _id: element }).then (ser => {

         
                model.ServiceCategory.findById(ser.Service_Category_Id).then(data => {

                    var b = { "Service": ser, "detail": data }
                    serve.push(b)
                    console.log(b)
                });
                ser.Service_Paid_Status=true;
                ser.Service_Bill=true;
                ser.save();
                var transporter = nodemailer.createTransport({ 
                    service: 'gmail',
                     auth: { user: 'ramsky2021@gmail.com', pass: 'ramsky@12345' } });
                     var mailOptions = { from: 'ramsky2021@gmail.com', to: user.User_Email, subject: 'From CarCREW for BILL', 
                     text:"hello mr"+user.User_Name+"your service bill generted with id"+bill._id+"and Amount with"+amt+"",
                    html:'<h1>CarCREW<br>Hello  '+user.User_Name+'<br>'
                    +'UserID :'+user._id+'<br>'+'Bill_No'+bill._id+'<br>'+'Is generated so Please Visit your CarCREW Dashboard'+'</h1>'}; 
             
                     transporter.sendMail(mailOptions, function(error, info){ if (error) { console.log(error); } else { console.log('Email sent: ' + info.response); }
                     model.Bill.findById(req.params.id).then(data=>{data.Bill_Mail_Status=true;
                        data.Bill_Amount=amt;
                        data.save().then( dsta=>{return res.status(200).json({total:amt})} )
                    })
                    }); 
            
                
                
                    })

            })
           
        
    
    
    })
        

    

    })



    

module.exports = Router