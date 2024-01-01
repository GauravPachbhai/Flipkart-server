

import mongoose from "mongoose";

export const connection =  async (URL) => {
    
    try{
        await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true});
        console.log(`Database connected Successfully--------------------------------------------->`);
    }catch(error){
        console.log(`Error while connecting database`,error.message);
    }
}

export default connection;