const jwt =  require('jsonwebtoken');


const createToken = async( data )=>{
   
    const token = await jwt.sign( data , process.env.SECRET_KEY ,{ expiresIn: '3d'}) 

    return token;
};

module.exports = {createToken};