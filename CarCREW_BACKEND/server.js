const express = require('express')
const app = express()
const port = 3000
const bodypaser=require('body-parser')
const mongoose=require('mongoose');
const model=require('./model')
const jwt=require('jsonwebtoken')
mongoose.connect("mongodb://localhost:27017/sky",{useUnifiedTopology:true,useNewUrlParser:true});
const nodemailer=require('nodemailer')

//header setting
var cors=require('cors')
app.use(cors({
    origin:'http://localhost:4200'
}));

app.use(bodypaser.json())

//route for User-CRUD
const User=require('./Route_User')
app.use('/Users',varifyt,User);

//route for Service-CRUD
const Service=require('./Route_Service')
app.use('/Services',varifyt,Service)

//route for ServiceCategory-CRUD
const ServiceCategory=require('./Route_ServiceCategory')
app.use('/ServiceCategories',varifyt,ServiceCategory)

//route for Bill
const Bill=require('./Route_Bill')
app.use('/Bills',varifyt,Bill)




app.post('/register',function(req,res,next){
   var user=new model.User({
    User_Name:req.body.name,
    User_Email:req.body.email,
    User_Password:req.body.pass
   });
   console.log(user.User_Name);
   let p=user.save();
   p.then(function(doc)
   {
       return res.status(201).json(doc);
   });
   p.catch(function(err){
       return res.status(501).json({massage:"error"});
   });
});




app.post('/login',function(req,res,next){
     let p=model.User.findOne({User_Email:req.body.email,User_Password:req.body.pass}).exec();
    
    p.then(function(doc)
    {   if(doc)
        {
            let token=jwt.sign({username:doc.User_Name,id:doc._id,role:doc.User_Role},'secret',{expiresIn:'3h'});
            return res.status(201).json(token);}
        else{
        return res.status(201).json(doc);}
    });
    p.catch(function(err){
        return res.status(501).json({massage:"error"});
    });
 });
 var usernamedata;
 app.get("/username",varifyt,function(req,res,next){
    
    return res.status(200).json(usernamedata)
 });






 function varifyt(req,res,next){
     let token=req.query.token;
     
    jwt.verify(token,'secret',function(err,tdata){
        if(err)
        { 
            return res.status(400).json({"error":"not valid token"});
        }
        if(tdata)
        {
            usernamedata=tdata
            next();
        }
    });
}



app.post('/forgot',function(req,res,next){
    let p=model.User.findOne({User_Email:req.body.email,User_Name:req.body.name}).exec();
   
   p.then(function(doc)
   {   if(doc)
       {
        var transporter = nodemailer.createTransport({ 
            service: 'gmail',
             auth: { user: 'ramsky2021@gmail.com', pass: 'ramsky@12345' } });
             var mailOptions = { from: 'ramsky2021@gmail.com', to: doc.User_Email, subject: 'From CarCREW for BILL', 
             text:"hello mr."+doc.User_Name+" your Password is  "+doc.User_Password+"  and PLEASE keep it private"}; 
     
             transporter.sendMail(mailOptions, function(error, info){ if (error) { console.log(error); } 
             else { console.log('Email sent: ' + info.response);
             return res.status(201).json(info.response);
            }
             
            }); 
       }
       else{
       }
   });
   p.catch(function(err){
       return res.status(501).json({massage:"error"});
   });
});
var usernamedata;
app.get("/username",varifyt,function(req,res,next){
   
   return res.status(200).json(usernamedata)
});
 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))