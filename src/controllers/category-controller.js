 
const CategoryModel = require('../models/category');

const { get,getAll , destroy , update ,create } = require('../controllers/crud-controller');
const { default: slugify } = require('slugify');

const createCategory = async  ( req,res )=>{

    try {

        if( req.body.title )   req.body.title = slugify( req.body.title )
        
        const  newCategory  = await create( CategoryModel , req.body);

        return res.status(201).json({
            success: true,
            message: 'category has been added',
            data: newCategory
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in category -controller layer')
        return res.status(201).json({

            success: false,
            message: 'not able to create category',
            error: error
        })
    }
}

const getCategory  = async( req,res )=>{

    try {
        
        const  Category = await get( CategoryModel , req.params.id);
        
        if( Category == null ) throw{message: 'Category does not exist'}

        return res.status(201).json({
            success: true,
            message: 'Category  fetched succefully',
            data: Category,
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Catagory -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Category',
            error: error
        })
    }
}

const getAllCategory  = async( req ,res )=>{
    
    try {
     

       console.log(req.query)
      
       const Category = await getAll( CategoryModel,req.query )
      

       if( Category == null ) throw{message: 'Category does not exist'}
      

    
    
        return res.status(201).json({
            success: true,
            data: Category
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Category -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Categories',
            error: error
        })
    }

}

const updateCategory = async( req,res)=>{
    try {
        
       
        if(  req.body.title ) req.body.title = slugify( req.body.title )
       
        const  Category = await update( CategoryModel ,req.body ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Category udated successfully',
            data: Category
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Catagory -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to update Catagory',
            error: error
        })
    }
}
const deleteCategory  = async( req,res)=>{
    try {
        
        const  Category = await destroy( CategoryModel ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Catagory has deleted successfully',
            data: Category
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Catagory -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to delete Catagory',
            error: error
        })
    }
}

module.exports = {
    getCategory ,
    createCategory ,
    getAllCategory ,
    updateCategory ,
    deleteCategory 
}