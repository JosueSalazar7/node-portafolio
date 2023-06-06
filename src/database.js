const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://0.0.0.0:27017/portafolio'

connection = async()=>{
    try {
         await mongoose.connect(MONGODB_URI,{
            //advertencia de fnciones
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection