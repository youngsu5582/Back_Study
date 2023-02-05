

import mongoose from 'mongoose';
import Product from './Schema/Product';
import History from './Schema/History';
import User from './Schema/User';

export function sync(stragety:string){

    const mongoUrl = process.env.MONGOURL || undefined;
    if(typeof mongoUrl ==='undefined'){
        console.log('Please Define MONGOURL in Env File ');
        process.exit(1);
    }
    else{
    mongoose.connect(mongoUrl,{retryWrites:true})
    .then(()=>console.log('Success Mongo DB Connect!'))
    .catch((e:any)=>{console.error(e);console.log('Failed Mongo DB Connect!')});
    }
}

export {Product,History,User};
export default {Product,History,User};