const jwt =  require('jsonwebtoken');


const refreshToken = async( data )=>{
   
    const token = await jwt.sign( data , process.env.SECRET_KEY ,{ expiresIn: '1d'}) 

    return token;
};

module.exports = {refreshToken};