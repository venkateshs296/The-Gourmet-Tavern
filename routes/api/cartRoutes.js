const router = require('express').Router();
const auth = require('../../middleware/auth');
const {Orders} = require('../../Schemas/Orders');
const {Users} = require('../../Schemas/Users');
const {Products} = require('../../Schemas/Products');
const {Cart} = require('../../Schemas/Cart');



// Get cart Items
router.get('/', auth ,async (req, res) => {
    
     try {    
        const cart = await Cart.findOne({customerID : req.user._id});
        if(cart!== null){
          res.send({items : cart.items, totalBill : cart.totalBill});
        }
        else {
          res.send({items : [], totalBill : 0});
        }

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while retrieving cart items"})
    }

});


//Delete cart Items
router.delete('/delete', auth ,async (req, res) => {
    
     const {product} = req.body;
     const user = req.user;
    try {
       const cart = await Cart.findOne({customerID : user._id}); 


        if(!cart) {
            return res.status(404).send({"message" : "cart not found"});
        }
      
       let deleteProductQty;
       let deleteProductPrice;
       for(let item of cart.items) {
          if(item.productID == product.id) {
             deleteProductQty = item.quantity;
             deleteProductPrice = item.price;
          }
       }

       const temp = await Cart.updateOne( 
            { "_id" : cart._id} , 
            { "$pull" : { "items" : { "productID" :  product.id } } } , 
            { "multi" : true }  
        );
       

        let newValues = {};
        newValues.totalBill = parseFloat(cart.totalBill) - 
           (parseInt(deleteProductQty) * parseFloat(deleteProductPrice));
        await cart.updateOne({$set : newValues});
        

        const updatedCart = await Cart.findOne({customerID : user._id}); 

        return res.send({items : updatedCart.items, totalBill : updatedCart.totalBill});

    } catch(err) {
        console.log(err);
        res.status(500).send({"message" : "error while deleting"});
    }
});




// Update cart Items
router.put('/update', auth ,async (req, res) => {
       
    const {product} = req.body;
    const user = req.user;
    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user adding to cart is required"}); }
    
    let cartProducts = [];
    let cartProduct = {};

    const previousCart = await Cart.findOne({customerID : req.user._id});
    let curBill = previousCart.totalBill;
    let isProductPresent = false;
    if(previousCart != null && previousCart != undefined) {
        
        cartProducts = previousCart.items;
  
        for(let item of cartProducts) {
          if(item.productID == product.id) {
             isProductPresent = true;
             curBill = curBill - (parseInt(item.quantity) * parseFloat(item.price));
             curBill = curBill + (parseInt(product.quantity) * parseFloat(product.price));
             item.quantity = product.quantity;
             break;
          }
        }

        if(!isProductPresent) {
            res.status(400).send({"message" : "Cannot update..particular product not present in cart"})
        }

       const updateQuery = {items : cartProducts, totalBill : parseFloat(curBill)};
    
       try {    
          await previousCart.updateOne({$set : updateQuery})    
          res.send({items : cartProducts, totalBill : curBill});
       } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while updating carts"})
       }

    } else {

         res.status(400).send({"message" : "Cannot update..user doesn't have items in cart"})

    }
   
});





// Add Items to cart
router.post('/add', auth ,async (req, res) => {

    const {product} = req.body;
    const user = req.user;

    if(!user || !user._id) { return res.status(400).send({"message" : "Details of user adding to cart is required"}); }
    
    let cartProducts = [];
    let cartProduct = {};
    let totalBill = 0;

    const previousCart = await Cart.findOne({customerID : req.user._id});
    
    if(previousCart != null && previousCart != undefined) {

        cartProducts = previousCart.items;

        for(let item of cartProducts) {
          if(item.productID == product.id) {
            return res.status(400).send({"message" : "Product already present in cart"}); 
          }
        }

        cartProducts.push({productID : product.id, name : product.name, quantity : product.quantity, price : product.price});       
        totalBill = parseFloat(previousCart.totalBill) + (parseInt(product.quantity) * parseFloat(product.price));
        
         const filterQuery = {customerID : user._id};
         const updateQuery = {items : cartProducts, totalBill : parseFloat(totalBill)};
    

       try {    
          await previousCart.updateOne({$set : updateQuery})    
          res.send({items : cartProducts, totalBill : totalBill});
       } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while updating carts"})
       }
    } else {

        cartProducts.push({productID : product.id, name : product.name, quantity : product.quantity, price : product.price});
        totalBill = parseInt(product.quantity) * parseFloat(product.price);


        try {
          const cart = new Cart({
            customerID : user._id,
            items : cartProducts, 
            totalBill : totalBill
          });
          await cart.save();     
          res.send(cart);

        } catch(err) {
          console.log(err);
          res.status(500).send({"message" : "error while saving carts"})
        }
    }


   
});


module.exports = router;