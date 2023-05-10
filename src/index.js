const express = require('express');

const bodyparser =  require('body-parser');
const dbConnect =  require('./config/DbConnect');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');

//routers
const AuthRouter = require('./routes/authRouts');
const ProductRouter = require('./routes/product-routs')

const BlogRouter =  require('./routes/blogRouts')
const CategoryRouter =  require('./routes/categoryrouts')

const BrandRouter =  require('./routes/brandRouts');
const CouponRouter =  require('./routes/couponRouts')


const dotenv =  require('dotenv').config();
const PORT = process.env.PORT;

const setupAndStartServer = () =>{

    const App =  express();

    App.use( morgan('dev') );
    
    App.use( bodyparser.json());
    App.use( bodyparser.urlencoded({ extended: true}));

    App.use(cookieParser());

    //auth route
    App.use( '/api/user',AuthRouter);
    //product route
    App.use( '/api/product', ProductRouter );
    //blog route
    App.use('/api/blog', BlogRouter)
    //category route
    App.use('/api/category' , CategoryRouter)
    //brand route
    App.use('/api/brand', BrandRouter );
    //coupon route
    App.use('/api/coupon' , CouponRouter )

    
    App.listen( PORT,  async () =>{
        

        console.log(`e-commerce main server has started on port ${PORT}`);
        await dbConnect();
        console.log('dataBase connection has made')
    })
};

setupAndStartServer();
