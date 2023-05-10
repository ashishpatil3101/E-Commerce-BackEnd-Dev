const  {
    create,
    destroy,
    update,
    get,
    getAll
} = require('../controllers/crud-controller');

const CartModel = require('../models/cart')

const UserModel = require('../models/user')

//middleware


const createCart = async ( req, res,next )=>{

    try {
         
        const userInfo = await UserModel.findById( req.params.id );

        if( !userInfo.cart){

           const newCart =  await create( CartModel , req.body );
           userInfo.cart = newCart;
           await userInfo.save();

           req.body.cartId = userInfo.cart.id;

           console.log("incart midd", userInfo.cart.id);
        }  
       
        next();
    }
    catch{
        console.log('somethings wrong in cart  middleware')
        return res.status(500).json({

            success: false,
            message: 'not able to create Cart',
            error: error
        })
    }

}

module.exports = { createCart }