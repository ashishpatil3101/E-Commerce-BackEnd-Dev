
const create = async ( model , data )=>{
    try {
        
        const result = await model.create(data);
        return result;
    } 
    catch (error) {
        console.log('somethings wrong incrud controller');
        throw error;
    }
}

const get = async ( model, id )=>{

    try {
        
        const result =  await model.findById(id);
        return result;
    } 
    catch (error) {
        console.log('somethings wrong in get crud controller');
        throw error;
    }
}
const getAll = async ( model ,Filterdata )=>{

    try {
        
      
       
        if( !Filterdata) var result =  await model.find( );
        else var result =  await model.find( Filterdata ).limit(8);
        
     
        return result;
    } 
    catch (error) {
        console.log('somethings wrong in crud controller');
        throw error;
    }
}

const destroy = async ( model ,id )=>{

    try {
       
        const result =  await model.findByIdAndDelete( id );
        
        return result;
    } 
    catch (error) {
        console.log('somethings wrong in crud controller');
        throw error;
    }
}

const update =  async( model , data, id) => {

    try {
      
        const result =  await model.findByIdAndUpdate( id ,data, {new: true});
        
        return result;
    } 
    catch (error) {
        console.log('somethings wrong in crud controller');
        throw error;
    }
}





module.exports = {
    create,
    get,
    getAll,
    destroy, 
    update
}