//Imports
const mongoose = require('mongoose');

//Orders schema
const ordersSchema = new mongoose.Schema({
    customerID : {
        type : String,
        required : true,
        ref : 'Users'
    },
    items : [{
        productID : {
            type : String,
            required : true,
            ref : 'Products'
        },
        name : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            min : 1,
            required : true
        },
        price : {
            type : Number,
            required : true,
            ref : 'Products'
        }
    }],
    orderType : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    bookingTime : {
        type : Date,
        required : true
    },
    totalBill : {
        type : Number,
        required : true
    }
});

//Export Orders Model
module.exports.Orders = mongoose.model('Orders',ordersSchema);