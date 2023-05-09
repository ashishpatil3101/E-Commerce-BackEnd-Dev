const blogModel = require('../models/blog');
const userModel =  require('../models/user');
const  {
    create,
    destroy,
    update,
    get,
    getAll
} = require('./crud-controller');

//middleware


const createBlog  = async ( req, res)=>{

    try {
         
        const newBlog = await create( blogModel , req.body ); 
        

        return res.status(201).json({
            success: true,
            message: 'your Blog has been published on website',
            data: newBlog
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in blog -controller layer')
        return res.status(201).json({

            success: false,
            message: 'not able to create blog',
            error: error
        })
    }
}

const updateBlog = async( req,res)=>{
    try {
        
       
        if(  req.body.title ) req.body.title = slugify( req.body.title )
       
        const  Blog = await update( blogModel ,req.body ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Blog udated successfully',
            data: Blog
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Blog -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to update Blog',
            error: error
        })
    }
}
const deleteBlog = async( req,res)=>{
    try {
        console.log(req.params.id)
        const  Blog = await destroy( blogModel ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Blog has deleted successfully',
            data: Blog.title
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to delete Blog',
            error: error
        })
    }
}
const getBlog = async( req,res )=>{

    try {
        
        const  Blog = await get( blogModel , req.params.id);
        Blog.numviews = Blog.numviews + 1;

        await Blog.save();
        
        if( Blog == null ) throw{message: 'Blog does not exist'}
        return res.status(201).json({
            success: true,
            message: 'Blog info fetched succefully',
            data: Blog,
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Blog -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch blog',
            error: error
        })
    }
}

const getAllBlogs = async( req ,res )=>{
    
    try {
        
    
        var  blog;

        if(  req.query){
            blog =  await getAll( blogModel , req.query)
        }
        else {
            console.log('aall blogs')
            blog = await getAll( blogModel,req.query )
        }

       if( blog == null ) throw{message: 'product does not exist'}
      

    
    
        return res.status(201).json({
            success: true,
            data: blog
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in blog -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch blogs',
            error: error
        })
    }

}

const likeBlog = async (req, res )=>{

    try {
  
        const Blog = await get( blogModel, req.query.blogId);
        
        const userDetail = await userModel.findById( req.params.id);
       
       
        let LikedArray =  Blog.likes;
        

        if ( LikedArray.includes( userDetail.id )){
            
            var index = LikedArray.indexOf( userDetail.id );
           
            if (index > -1) {
                LikedArray.splice(index, 1);
            }

        }
        else{
           
            LikedArray.push( userDetail.id);
        }

        Blog.numviews = Blog.numviews + 1;

        
        await Blog.save();
   
        return res.status(201).json({
            success: true,
            data: Blog
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in blog -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to Like or dislike the blog',
            error: error
        })
    }
}

module.exports = {

    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlog,
    likeBlog

}