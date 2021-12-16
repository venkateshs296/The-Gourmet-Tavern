//Imports
const mongoose = require('mongoose');

//Products schema
const productsSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        minlength : 3
    },
    productType : {
        type: String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    category : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    price : {
            type : Number,
            required : true,
            min : 0
    },
    quantity : {
        type : Number,
        required : true,
        min : 0
    },
    image : {
        type : String,
        required : true
    },
    cuisine : {
            type : String,
            required : false,
    },
    preference : {
            type : String,
            required : false,
    },
    level : {
        type : Number,
        required : false,
        min : 0
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
});

//Export Products Model
module.exports.Products = mongoose.model('Products', productsSchema);