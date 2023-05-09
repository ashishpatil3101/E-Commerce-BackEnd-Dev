const mongoose=  require('mongoose');

const blogSchema =  new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Admin'
    },
    description: {
        type:  String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    numviews: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    

},{ 
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },

    timestamps: true

  });

const blogModel = mongoose.model( 'Blog', blogSchema);

module.exports = blogModel;