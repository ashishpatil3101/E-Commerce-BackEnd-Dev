
const jwt = require('jsonwebtoken');
const user = require('../models/user')

const authMiddleware =  async( req,res, next)=>{

    
          console.log('middle')
        try {
             
            const token =  req.headers['x-access-token'];

            const response  =await jwt.verify( token ,  process.env.SECRET_KEY);
            
            if( response) 
            {   
                const gotUser = await user.findById( response.id )
             
                if( !gotUser ) throw {meassage: 'user does not exist'}
                if( !req.params.id){ req.params.id = response.id;}
                console.log('middle2 !', req.params.id)
                next();
            }

            
            
        } 
        catch (error) {
            console.log("something is wrong auth - middleware  ");
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    
}

const isAdmin = async( req, res, next )=>{

    try {
        
        const token =  req.headers['x-access-token'];

       const response  = jwt.verify( token ,  process.env.SECRET_KEY);
       
        const userDetail  =  await user.findById( response.id );
        if( !userDetail ) throw "user does not exist";
        
        if( userDetail.role != 'Admin') throw 'user is not admin';
        next();
    } 
    catch (error) {
        console.log("something is wrong admin auth - middleware  ");
            return res.status(500).json({
                success: false,
                error: error
            })
    }
}

module.exports = { 
    authMiddleware,
    isAdmin
}