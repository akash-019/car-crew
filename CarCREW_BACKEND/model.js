var mongoose=require('mongoose');
var schema=mongoose.Schema,ObjectId=schema.ObjectId;
//Customer schema
var User=new schema({
    User_Name:{type:String,require:true},
    User_Email:{type:String,require:true},
    User_Password:{type:String,require:true},
    User_Mobile_No:{type:String,require:true},
    User_Address:{type:String,require:true},
    User_Role:{type:String,required:true,default:'User'}
});

//Service

var Service=new schema({
    Service_Category_Id:{type:ObjectId,require:true,ref:'ServiceCategory'},
    Service_Status:{type:String,require:true,default:'pending'},
    Service_Car_No:{type:String,require:true},
    Service_Customer_Id:{type:ObjectId,require:true,ref:'User'},
    Service_Worker_Id:{type:ObjectId,require:true},
    Service_Paid_Status:{type:Boolean,require:true,default:false},
    Service_Date:{type:Date,require:true,default:Date.now},
    Service_Bill:{type:Boolean,require:true,default:false}
});

var ServiceCategory=new schema({
    Service_Name:{type:String,require:true},
    Service_Price:{type:Number,require:true},
    Service_Description:{type:String,require:true}
})

//Bill

var Bill=new schema({
    Bill_Service_Id:[{type:ObjectId,ref:'User'}],
    Bill_Customer_Id:{type:ObjectId,require:true},
    Bill_Mail_Status:{type:Boolean,require:true,default:false},
    Bill_Amount:{type:Number,require:true}
}); 




module.exports={'User':mongoose.model('User',User),
                'Service':mongoose.model('Service',Service),
                'Bill':mongoose.model('Bill',Bill),
                'ServiceCategory':mongoose.model('ServiceCategory',ServiceCategory)};
