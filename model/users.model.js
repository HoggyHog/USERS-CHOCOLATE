const mongoose=require('mongoose');
const validator=require('validator')

var UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:'Required'
    },
    DOB:{
        type:String
    },
    Gender:{
        type:String
    },
    EmailId:{
        type:String,
        /* required:'Email ID is required',
        validate:[validator.isEmail,'invalid email'] */
    },
    Number:{
        type:String
    },
    AltNumber:{
        type:String
    },
    BillingAddress:{
        type:String
    },
    Terms:{
        type:String
    },
    /* GovtId:{
        type:
    } */
});

mongoose.model('Users',UserSchema)
//so we basically just made a collection in the db, called 'Course'

