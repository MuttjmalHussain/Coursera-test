const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connneted with database ${mongoose.connection.host} successfully`.bgCyan.white)

    }catch(error){
        console.log(`Error in connecting with db ${error}`.bgRed.white)
    }
}
module.exports = connectDB;