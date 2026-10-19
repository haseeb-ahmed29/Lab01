const mongoose = require ("mongoose")
 const connectDB = async()=>{

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error connectiong to MongoDB: ${error.message}`);

    }
 }

 module.exports = connectdb;