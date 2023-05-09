const express =  require('express');
const router  = express.Router();

const { authMiddleware ,isAdmin} = require('../middlewares/auth-middleware')


const { 
    createBlog,
    deleteBlog,
    updateBlog,
    getAllBlogs,
    getBlog,
    likeBlog
  
     } =  require('../controllers/blog-controller');

const f =( req,res ,next)=>{
    console.log('scsncs')
    next();
}

router.post('/',
           authMiddleware,
           isAdmin,
           createBlog 
           );

 router.delete('/:id', isAdmin, deleteBlog )

 router.put('/update/:id', updateBlog );

router.get('/:id' , getBlog);
router.get('/' ,  getAllBlogs)

//like a blog [ blogid as query param and send token in header] 
router.put('/likes' , f,authMiddleware, likeBlog)

module.exports = router;