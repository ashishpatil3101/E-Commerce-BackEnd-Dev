const express=  require('express');
const router =  express.Router();

const {
    getBrand,
    getAllBrand,
    createBrand,
    deleteBrand,
    updateBrand
} = require('../controllers/brand-controller');

const { 
    authMiddleware,
    isAdmin
} =  require('../middlewares/auth-middleware')

router.post('/' , authMiddleware, isAdmin ,createBrand );

router.get('/id/:id', getBrand);
router.get('/all' ,getAllBrand);

router.delete('/:id', authMiddleware ,isAdmin , deleteBrand );

router.put('/:id' , authMiddleware ,isAdmin , updateBrand );

module.exports = router;