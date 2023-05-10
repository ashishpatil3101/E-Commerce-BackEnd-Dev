const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }

        }
    ],
    totalPrice: {
        type: Number
    },
    orderstatus: {
        type: String,
        enum: ['processing', 'dispatched', 'delivered','cancelled']
    },
    orderby: {
        type: String
    }
},{ timestamps: true} )

const orderModel = mongoose.model('Order', orderSchema )

module.exports =  orderModel