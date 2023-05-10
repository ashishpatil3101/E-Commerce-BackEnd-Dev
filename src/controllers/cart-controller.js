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


const createCart = async ( req, res )=>{

    try {
         
       const newCart = await  create( CartModel, req.body );

       return res.status(201).json({
        success: true,
        data: newCart
       })
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