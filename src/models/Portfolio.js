//Para crear las primeras tablaswe
const {Schema, model} = require('mongoose')

const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    skill :{
        type:String,
        require:true
    },
    contact: {
        type:String,
        required: true,
    }
},{
    timestamps:true
})

module.exports = model('portfolio',portfolioSchema)

