
const  mongoose = require('mongoose');

const cuoponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    expiry: {
        type: Date,
        required: true,
        
    }
    ,
    discount: {
        type: Number,
        
        required: true,
    },
    
})

const couponModel =  mongoose.model('Coupon', cuoponSchema)

module.exports = couponModel;