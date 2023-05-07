
const express = require('express');
const {   
    createUser ,
    userlogIn,
    getUser , 
    getAllUser ,
    deleteUser ,
    updateUser,
    Block_unblockUser,
    unblockUser
    } 
    = require('../controllers/user-controller');

const { 
    authMiddleware,
    isAdmin
    } = require('../middlewares/auth-middleware')

const router =  express.Router();

router.post('/register' ,createUser);
router.post('/login', userlogIn );

router.get('/All', getAllUser );
router.get('/:id', getUser);

router.delete('/:id' ,  deleteUser );

//send token and body as to be updated
router.patch('/',authMiddleware, updateUser )

//block unblock
//send token  and id as body param to be toggle block
router.put('/block-user',authMiddleware,isAdmin, Block_unblockUser);
router.put('/unblock-user',authMiddleware,isAdmin, Block_unblockUser);




module.exports =  router;
