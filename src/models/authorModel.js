const mongoose = required('mongoose')

const authorSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        enum:["Mr", "Mrs", "Miss"]
    },

    email: {
        type: mongoose.SchemaTypes.Email, 
        required: true,
        unique:true  
    },
    password:{
        type: String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("Author", authorSchema)
