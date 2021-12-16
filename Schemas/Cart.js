//Imports
const mongoose = require('mongoose');

//Cart schema
const cartSchema = new mongoose.Schema({
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
    totalBill : {
        type : Number,
        required : true
    }
});

//Export Cart Model
module.exports.Cart = mongoose.model('Cart',cartSchema);