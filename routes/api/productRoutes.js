//Imports
const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../../middleware/auth');
const {Products} = require('../../Schemas/Products');


// Get product details
router.get('/',(req, res) => {

    let search = {};
    const {productType, category, cuisine, preference, searchTerm, level, limit, skip} = req.query;
    
    if(category) {

        search.category = category.trim();
    }

    if(cuisine) {
        search.cuisine = cuisine.trim();
    }

    if(preference) {
        search.preference = preference.trim();
    }

    if(level) {
        search.level = level.trim();
    }

    if(productType) {
        search.productType = productType.trim();
    }

    if(searchTerm) {
        search.productName = { $regex: searchTerm, $options: 'i'};
    }
    search.isDeleted = false;

    Products.find(search,
        function(err, result) {
            if(err) {
                return res.status(400).send({"message" : "Error during querying"});
            }
            const start = parseInt(skip);
            const end = start + parseInt(limit);
            if(result.length < end) {
                return res.send({length: result.length, products : result.slice(start, result.length)});
            }
            return res.send({length: result.length, products : result.slice(start, end)});
        });       
});



// Add product to inventory(Admin)
router.post('/add', auth , async (req, res) => {

    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }

    const check = await Products.findOne({productName : req.body.productName.trim()});
    if(check) { return res.status(400).send({"message" : "Product already exists"}); }

    const price = parseFloat(req.body.price);
    const quantity = parseFloat(req.body.quantity);

    const image = req.body.image;

    try {
        const products = new Products({
            ...req.body,
            price,
            quantity,
            image
        });
        await products.save();
        let result = products.toObject();
        res.send(result);
    } catch(err) {
         res.status(500).send("Error while saving!");
    }
}, (error, req, res, next) => {
    res.status(400).send({"message" : error.message});
});


// Update product details(Admin)
router.put('/:id', auth, async (req, res) => {

    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }
    const product = await Products.findById(req.params.id);
    if(!product) { return res.status(400).send({"message" : "product not found"}); }

    let newValues = {};
    const {productName, description, category, price, quantity, cuisine, preference, level, image} = req.body;
    if(productName) {
        const check = await Products.findOne({productName : productName.trim()});
        
        if(check && !check._id.equals(product._id)) {
            return res.status(400).send({"message" : "product name already exists"});
        }
        newValues.productName = productName;
    }
    if(description) {
        newValues.description = description;
    }
    if(category) {
        newValues.category = category;
    }
    if(price) {
        newValues.price = parseFloat(price);
    }
    if(quantity) {
        newValues.quantity = parseFloat(quantity);
    }
    if(cuisine) {
        newValues.cuisine = cuisine;
    }
    if(preference) {
        newValues.preference = preference;
    }
    if(level) {
        newValues.level = level;
    }
    if(image) {
        newValues.image = image;
    }

    try {
          await product.updateOne({$set : newValues});
          
     } catch(err) {
         res.status(500).send({"message" : "error while updating"});
    }

    let updatedProduct = await Products.findById(req.params.id);
    res.send(updatedProduct);

}, (error, req, res, next) => {
    res.status(400).send({"message" : error.message});
});


// Delete product(Admin)
router.delete('/:id', auth ,async (req, res) => {

    if(!req.user.isAdmin) { return res.status(401).send({"message" : "Access denied!"}); }

    try {
        const product = await Products.findById(req.params.id);
        if(!product) {
            return res.status(404).send({"message" : "product not found"});
        }
        product.isDeleted = true;
        await product.save();
        res.send(product);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while deleting"});
    }
});


module.exports = router;