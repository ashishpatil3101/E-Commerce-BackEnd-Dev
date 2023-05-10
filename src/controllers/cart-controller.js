const  {
    create,
    destroy,
    update,
    get,
    getAll
} = require('../controllers/crud-controller');

const CartModel = require('../models/cart')

const UserModel = require('../models/user');
const { use } = require('../routes/authRouts');

//middleware


const createCart = async ( req, res ,next )=>{

    try {

        const userDetail = await UserModel.findById( req.params.id );
         console.log(userDetail)

    if( !userDetail.cart ){
         const newCart = await  create( CartModel, {
         products: [],
         carttotal: 0,
         orderby: req.params.id
        } );
      
       console.log(newCart.id)
       await UserModel.findByIdAndUpdate( req.params.id , { cart: newCart },{new: true});

       await userDetail.save();
     
    }
   
      next();

    //    return res.status(201).json({
    //     success: true,
    //     data: { newCart ,userDetail }
    //    })
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