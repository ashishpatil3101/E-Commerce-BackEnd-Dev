
const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isblocked: {
        type: Boolean,
        default: false
    },
    
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
      
        }
    ],

},{ timestamps: true});

UserSchema.pre( 'save', function ( next){

    const  user = this;
    const SALT = bcrypt.genSaltSync(9);
    
    const encryptedPassword =  bcrypt.hashSync( user.password, SALT );
    user.password = encryptedPassword;

    next();
})

UserSchema.methods.isPasswordMatch = async function ( userInputPassword ){
   
    return await bcrypt.compare( userInputPassword, this.password );
}
const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;