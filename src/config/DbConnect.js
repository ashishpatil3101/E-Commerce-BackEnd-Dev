const mongoose =  require('mongoose');

const  connect =  async() =>{

    console.log('in db connect', process.env.MONGODB_URL);

    await mongoose.connect( process.env.MONGODB_URL)
};

module.exports = connect;