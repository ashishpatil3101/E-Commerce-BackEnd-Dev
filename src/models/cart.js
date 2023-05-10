const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        
        }
    ],
    carttotal: {
        type: Number,
        default: 0
    },
    totalafterdiscount: {
        type: Number
    }

},{ timestamps: true} )

const cartModel = mongoose.model('Cart', cartSchema )

module.exports =  cartModel