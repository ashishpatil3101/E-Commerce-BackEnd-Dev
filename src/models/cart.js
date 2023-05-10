const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: {
                type: Number
            }
        
        }
    ],
    carttotal: {
        type: Number,
        default: 0
    },
    totalafterdiscount: {
        type: Number
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{ timestamps: true} )

const cartModel = mongoose.model('Cart', cartSchema )

module.exports =  cartModel