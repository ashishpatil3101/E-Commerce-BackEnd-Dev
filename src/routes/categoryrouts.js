const express =  require('express');

const router = express.Router();

const {
    createCategory,
    deleteCategory,
    updateCategory,
    getCategory,
    getAllCategory

} = require('../controllers/category-controller');

const {
    authMiddleware,
    isAdmin

}= require('../middlewares/auth-middleware')

router.post('/' , authMiddleware, isAdmin, createCategory );

router.get('/id/:id' , getCategory);

router.get('/all', getAllCategory);

router.delete('/:id' ,  authMiddleware, isAdmin, deleteCategory);

router.put('/:id', authMiddleware, isAdmin,  updateCategory);

module.exports = router;