
const express =  require('express');
const router = express.Router();
const  {

    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    addToWishlist

}  = require('../controllers/product-controller')

const f = async (req,res,next)=>{
    console.log('starting')
    next();
}

//middelware
const { isAdmin ,authMiddleware }  = require('../middlewares/auth-middleware')

router.post('/Add',   isAdmin, createProduct);
router.get('/All',  getAllProduct);

router.get('/:id' ,getProduct )


//update
router.put('/id/:id', isAdmin,  updateProduct)

router.delete('/:id',  isAdmin ,deleteProduct);

router.put('/addTowishList' ,  authMiddleware, addToWishlist );





module.exports = router