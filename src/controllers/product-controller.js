
const ProductModel = require('../models/product');

const { get,getAll , destroy , update ,create } = require('../controllers/crud-controller');
const { default: slugify } = require('slugify');

const createProduct = async  ( req,res )=>{

    try {

        if(  req.body.title) req.body.title = slugify( req.body.title )
        
        const  newProduct = await create( ProductModel , req.body);

        return res.status(201).json({
            success: true,
            message: 'your product has been published on website',
            data: newProduct
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(201).json({

            success: false,
            message: 'not able to create product',
            error: error
        })
    }
}

const getProduct = async( req,res )=>{

    try {
        
        const  Product = await get( ProductModel , req.params.id);
        
        if( Product == null ) throw{message: 'product does not exist'}
        return res.status(201).json({
            success: true,
            message: 'product info fetched succefully',
            data: Product,
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch product',
            error: error
        })
    }
}

const getAllProduct = async( req ,res )=>{
    
    try {
        
        let filterObj ={};
        var  Products;

        if(req.query.maxPrice) {
            filterObj.price= {$lt: req.query.maxPrice} ;
            Products = await getAll( ProductModel ,filterObj);
        }
        else if(req.query.minPrice){
          filterObj.price={$gt: req.query.minPrice};
          Products = await getAll( ProductModel ,filterObj);
        }
        else {
            Products = await getAll( ProductModel,req.query )
        }

       if( Products == null ) throw{message: 'product does not exist'}
      

    
    
        return res.status(201).json({
            success: true,
            data: Products
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch productss',
            error: error
        })
    }

}

const updateProduct = async( req,res)=>{
    try {
        
       
        if(  req.body.title ) req.body.title = slugify( req.body.title )
       
        const  Product = await update( ProductModel ,req.body ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'product udated successfully',
            data: Product
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to update products',
            error: error
        })
    }
}
const deleteProduct = async( req,res)=>{
    try {
        
        const  Product = await destroy( ProductModel ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'product has deleted successfully',
            data: Product
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in product -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to delte product',
            error: error
        })
    }
}

module.exports = {
    getProduct,
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}
