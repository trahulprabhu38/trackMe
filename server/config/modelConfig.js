import mongoose from 'mongoose'

export const connectToDb = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI,{});
        console.log("connected to the database successfully!")
    }catch(e){
        console.log("the error is :",e)
    }
}

