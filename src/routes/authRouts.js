
const express = require('express');
const {   
    createUser ,
    userlogIn,
    getUser , 
    getAllUser ,
    deleteUser ,
    updateUser,
    Block_unblockUser,
    adminlogIn,
    getWishlist,
    addToCart
 
    } 
    = require('../controllers/user-controller');

const {  createCart  } = require('../controllers/cart-controller')

const { 
    authMiddleware,
    isAdmin
    } = require('../middlewares/auth-middleware')

const router =  express.Router();

router.post('/register' ,createUser);
router.post('/login', userlogIn );
//admin login
router.post('/Adminlogin', adminlogIn );

router.get('/All', getAllUser );
router.get('/id/:id', getUser);

router.delete('/:id' ,  deleteUser );

//send token and body as to be updated
router.patch('/',authMiddleware, updateUser )

//block unblock
//send token  and id as body param to be toggle block
router.put('/block-user',authMiddleware,isAdmin, Block_unblockUser);
router.put('/unblock-user',authMiddleware,isAdmin, Block_unblockUser);

router.get('/user-wishList/:id', authMiddleware, getWishlist)



router.post('/cart' ,authMiddleware, createCart );

router.post('/AddProductToCart' ,authMiddleware, addToCart )





module.exports =  router;
