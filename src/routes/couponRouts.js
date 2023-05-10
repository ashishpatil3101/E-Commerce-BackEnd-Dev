const express =  require('express');
const router = express.Router();

const {
    createCoupon,
    deleteCoupon,
    updateCoupon,
    getAllCoupon,
    getCoupon
} =  require('../controllers/coupon-controller')

const { authMiddleware ,isAdmin } = require('../middlewares/auth-middleware')

router.post('/' , authMiddleware, isAdmin ,createCoupon );

router.get('/id/:id' , getCoupon );
router.get('/all' , getAllCoupon );

router.put('/id/:id', authMiddleware, isAdmin , updateCoupon ),

router.delete('/:id' , authMiddleware, isAdmin ,deleteCoupon );

module.exports= router