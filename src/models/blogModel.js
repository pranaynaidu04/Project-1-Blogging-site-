const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId:{
        type:ObjectId,
        ref:"Author"
    },
    tags:[{
        type:String,
        required:true
    }],
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:[]
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    publishedAt:{
        type:Number,
        default:(new Date()).getTime()
    }    
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)