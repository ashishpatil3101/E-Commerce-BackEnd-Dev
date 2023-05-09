const BrandModel = require('../models/Brand');

const { get,getAll , destroy , update ,create } = require('../controllers/crud-controller');
const { default: slugify } = require('slugify');

const createBrand = async  ( req,res )=>{

    try {

        if(  req.body.title) req.body.title = slugify( req.body.title )
        
        const  newBrand = await create( BrandModel , req.body);

        return res.status(201).json({
            success: true,
            message: 'your Brand has  added on website',
            data: newBrand
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Brand -controller layer')
        return res.status(201).json({

            success: false,
            message: 'not able to add brand on website',
            error: error
        })
    }
}

const getBrand = async( req,res )=>{

    try {
        
        const  Brand = await get( BrandModel , req.params.id);
        
        if( Brand == null ) throw{message: 'Brand does not exist'}
        return res.status(201).json({
            success: true,
            message: 'Brand info fetched succefully',
            data: Brand,
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Brand -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Brand',
            error: error
        })
    }
}

const getAllBrand = async( req ,res )=>{
    
    try {
        
       const Brand = await getAll( BrandModel,req.query )
      

       if( Brand == null ) throw{message: 'Brand does not exist'}
      
       return res.status(201).json({
            success: true,
            data: Brand
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Brand -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Brands',
            error: error
        })
    }

}

const updateBrand = async( req,res)=>{
    try {
        
       
        if(  req.body.title ) req.body.title = slugify( req.body.title )
       
        const  Brand = await update( BrandModel ,req.body ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Brand udated successfully',
            data: Brand
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Brand -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to update Brand',
            error: error
        })
    }
}
const deleteBrand = async( req,res)=>{
    try {
        
        const  Brand = await destroy( BrandModel ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Brand has deleted successfully',
            data: Brand
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Brand -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to delete Brand',
            error: error
        })
    }
}

module.exports = {
    getBrand,
    createBrand,
    getAllBrand,
    updateBrand,
    deleteBrand
}
