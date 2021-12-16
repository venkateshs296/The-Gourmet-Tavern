const router = require('express').Router();
const auth = require('../../middleware/auth');
const {Orders} = require('../../Schemas/Orders');
const {Users} = require('../../Schemas/Users');
const {Products} = require('../../Schemas/Products');
const {Cart} = require('../../Schemas/Cart');


// Get All orders of user
router.get('/', auth ,async (req, res) => {

    const user = await Users.findById(req.user._id);
    await user.populate({
        path : 'orders',
        options : {
            sort : {
               bookingTime : 1 
            }
        }
    }).execPopulate();
    res.send(user.orders);

});

// Place order
router.post('/add', auth ,async (req, res) => {

    const {orderType} = req.body;
    const user = req.user;
    const cart = await Cart.findOne({customerID : user._id});

    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user placing order is required"}); }
    if(cart.items.length <= 0) { return res.status(400).send({"message" : "cart looks empty! cannot place order"}); }
    if(parseFloat(cart.total) < 0) { return res.status(400).send({"message" : "Total Amount must be a positive number"}); }
    if(!orderType) { return res.status(400).send({"message" : "please specify whether order is dinein or pickup"}); }
    
    let productList = [];
    for(let item of cart.items) {

        const inventoryProduct = await Products.findById(item.productID);
        if(!inventoryProduct) { return res.status(400).send({"message" : "Invalid product in cart!"}); }
        if(parseFloat(item.quantity) > inventoryProduct.quantity) 
        { 
            if(inventoryProduct.quantity == 0) {
                return res.status(400).send({
                    "message" : `Sorry! ${inventoryProduct.productName} is Currently unavailable`
                })
            }
            return res.status(400).send({"message" : 
                `Not enough Quantity of ${inventoryProduct.productName} available,
                Only ${inventoryProduct.quantity} left in stock`}); 
        }

        productList.push({productID : item.productID, name : item.name, quantity : item.quantity, price : item.price});
    }

    try {
        const order = new Orders({
            customerID : user._id,
            items : productList, 
            orderType : orderType,
            bookingTime : Date.now(),
            totalBill : parseFloat(cart.totalBill)
        });
        await order.save();
        for(let item of cart.items) {

            const product = await Products.findById(item.productID);
            product.quantity = parseInt(product.quantity) - parseInt(item.quantity);
            await product.save();
        }
        
        const temp = await Cart.deleteOne({customerID : user._id});
        res.send(order);

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while saving orders"})
    }
});


module.exports = router;