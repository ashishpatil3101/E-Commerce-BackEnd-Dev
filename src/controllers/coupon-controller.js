const CouponModel =  require('../models/coupon');
const { get,getAll , destroy , update ,create } = require('../controllers/crud-controller');

const createCoupon = async  ( req,res )=>{

    try {

     
        
        
        const  newCoupon = await create( CouponModel , req.body);

        return res.status(201).json({
            success: true,
            message: 'your Coupon has created',
            data: newCoupon
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Coupon -controller layer')
        return res.status(201).json({

            success: false,
            message: 'not able to create Coupon',
            error: error
        })
    }
}

const getCoupon = async( req,res )=>{

    try {
        
        const Coupon = await get( CouponModel , req.params.id);
        
        if( Coupon == null ) throw{message: 'Coupon does not exist'}
        
        return res.status(201).json({
            success: true,
            message: 'Coupon info fetched succefully',
            data: Coupon,
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Coupon -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Coupon',
            error: error
        })
    }
}

const getAllCoupon = async( req ,res )=>{
    
    try {
        
      const  Coupon = await getAll( CouponModel,req.query )
        

       if( Coupon == null ) throw{message: 'Coupon does not exist'}
      
       return res.status(201).json({
            success: true,
            data: Coupon
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Coupon -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to fetch Coupons',
            error: error
        })
    }

}

const updateCoupon = async( req,res)=>{
    try {
        
       
        if(  req.body.title ) req.body.title = slugify( req.body.title )
       
        const  Coupon = await update( CouponModel ,req.body ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Coupon udated successfully',
            data: Coupon
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Coupon -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to update Coupons',
            error: error
        })
    }
}
const deleteCoupon = async( req,res)=>{
    try {
        
        const  Coupon = await destroy( CouponModel ,req.params.id );

        return res.status(201).json({
            success: true,
            message: 'Coupon has deleted successfully',
            data: Coupon
           
        })
        
    } 
    
    catch (error) {
        console.log('somethings wrong in Coupon -controller layer')
        return res.status(500).json({

            success: false,
            message: 'not able to delete Coupon',
            error: error
        })
    }
}

module.exports = {

    createCoupon,
    getCoupon,
    getAllCoupon,
    deleteCoupon,
    updateCoupon,
    
}
