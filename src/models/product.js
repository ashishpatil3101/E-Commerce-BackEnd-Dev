
const mongoose =  require('mongoose');

const  productSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: Array
    },
    ratings: [
        {
            star: Number,
            postedby: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    brand: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    }

},{ timestamps: true
});

const productModel = mongoose.model('Product' , productSchema);

module.exports = productModel;