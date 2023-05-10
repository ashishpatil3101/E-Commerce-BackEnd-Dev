const user = require('../models/user');
const product =  require('../models/product')
const cart =  require('../models/cart')

const  { createToken } = require('../config/jwtToken')
const { create ,get,getAll , destroy , update } = require('../controllers/crud-controller');

const createUser =  async( req ,res )=>{

    try {
         
       
        const isExisted =  await user.findOne(
            {  
                 email: req.body.email 
            }
        );

        if( isExisted) throw {message: 'user already existed'};

        const newUser = await user.create( req.body );

        return res.status(201).json({
            success: true,
            data: newUser
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to create user',
            error: error
        })
    }
};

const userlogIn = async(req ,res ) =>{

    try {
        
        const { email ,password }= req.body;
        
       

        const IsUserPresent  =  await user.findOne({
            email: email
        });
     
        if( !IsUserPresent )throw{ message: 'user does not exist'};
        
        const result = await IsUserPresent.isPasswordMatch( password )
           
        if( !result) throw {message: 'please enter correct password'};

        const token = await createToken({id: IsUserPresent.id,email: IsUserPresent.email})
        

        return res.status(201).json({
            success: true,
            message: 'user successfully loged in',
            data: {
                email: IsUserPresent.email,
                Token: token
            }
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to login ',
            error: error
        })
    }
}
const adminlogIn = async(req ,res ) =>{

    try {
        
        const { email ,password }= req.body;
        
       

        const IsUserPresent  =  await user.findOne({
            email: email
        });
     
        if( !IsUserPresent )throw{ message: 'user does not exist'};
        
        const result = await IsUserPresent.isPasswordMatch( password )

        if( IsUserPresent.role != 'Admin') throw 'user is not admin'
            
        if( !result) throw {message: 'please enter correct password'};

        const token = await createToken({id: IsUserPresent.id,email: IsUserPresent.email})
        

        return res.status(201).json({
            success: true,
            message: 'Admin successfully loged in',
            data: {
                email: IsUserPresent.email,
                Token: token
            }
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to login ',
            error: error
        })
    }
}
const getUser = async( req, res)=>{
    
      try {
         
         const userResult = await get(user , req.params.id);

         if( userResult == null ) throw{message: 'user does not exist'}

    
        return res.status(201).json({
            success: true,
            message: 'successfully fetched user',
            data: userResult
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able fetch user ',
            error: error
        })
    }
}

const getAllUser = async ( req,res )=>{

    try {
       
        const result = await getAll( user );

        return res.status(201).json({
            success: true,
            message: 'successfully fetched users',
            data: result
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able fetch users ',
            error: error
        })
    }
}
const deleteUser = async ( req, res )=>{

    try {

        if( !get( user,  req.params.id ) ) throw {message: 'user does not exist '}
       
        await destroy( user , req.params.id)
        
        return res.status(201).json({

            success: true,
            message: 'successfully deleted the user',
            
        })
    } 
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able Delete user',
            error: error
        })
    }
}

const updateUser = async ( req,res )=>{

    try {
        
        
        const result = await update( user , req.body, req.params.id);

        return res.status(201).json({
            success: true,
            message: 'successfully updated the user',
            data: result
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able update user',
            error: error
        })
    }
}

const Block_unblockUser =  async( req ,res )=>{

   
    try {
        
        const UserDetail =  await user.findById( req.body.id);
        
        //toggle user block function
        UserDetail.isblocked = !UserDetail.isblocked;
        UserDetail.save();
        
       
        if( UserDetail.isblocked )  var str = 'blocked'
        else  var str = 'unblocked'

        return res.status(201).json({
            success: true,
            message: `successfully ${str} the user`,
            data: UserDetail
           
        })
        
    } 
    
    catch (error) {
       
       

        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: `not able to block-unblock the user`,
            error: error
        })
    }


}
const getWishlist =  async( req ,res )=>{

   
    try {
        
        const UserDetail =  await user.findById( req.params.id);
        if( !UserDetail ) throw new error('User does not exist')
        
        const wishlistArray = UserDetail.wishlist;

         return res.status(201).json({
            success: true,
            message: `successfully get the wishlist`,
            data: {
                email: UserDetail.email,
                wishList: wishlistArray
            }
           
        })
        
    } 
    
    catch (error) {
       
       

        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: `not able get  the users wishlist`,
            error: error
        })
    }


}

const addToCart = async( req ,res )=>{

   
    try {
        
        const UserDetail =  await user.findById( req.params.id);
        if( !UserDetail ) throw new error('User does not exist')

        const productId =  req.body.productId
        const productDetail = await product.findById( productId );

        
        let cartID = req.body.cartId;
       
        const CART  = await cart.findById( cartID )
    
        console.log("user",CART)

        let cartProductArray = CART.products;

        if( !cartProductArray ) cartProductArray = [];

       var isProductPresnt = false;
          
        for ( let  i = 0; i < cartProductArray.length ; i++){

            if( cartProductArray[i].id === productId){
                
                isProductPresnt = true;
                break;
            }
        }
        //  throw('product already exist in cart')

        let alreadyPresentTotalPrice = CART.carttotal

       if( !isProductPresnt )  alreadyPresentTotalPrice += productDetail.price;
        console.log("user  122 ",cartProductArray)

        if( !isProductPresnt ) cartProductArray.push( productId );

        UserDetail.cart = CART;
        CART.carttotal = alreadyPresentTotalPrice;

       
       

        await CART.save();
        await UserDetail.save();
        
        

         return res.status(201).json({
            success: true,
            message: `successfully updated the cart`,
            data: {
                email: UserDetail.email,
                cart: UserDetail.cart
            }
           
        })
        
    } 
    
    catch (error) {
       
       

        console.log('somethings wrong in user -controller layer')
        return res.status(500).json({

            success: false,
            message: `not able to update cart`,
            error: error
        })
    }


}



module.exports = {
    createUser,
    userlogIn,
    getUser,
    getAllUser,
    deleteUser,
    updateUser,
    Block_unblockUser,
    adminlogIn,
    getWishlist
    ,addToCart
    
}