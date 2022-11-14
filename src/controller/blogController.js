const mongoose = require("mongoose");
const blogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
// const { isValidObjectId } = require("mongoose").Types.ObjectId

const createBlog = async function (req, res) {
    try {
        let data = req.body
        let authorId = data.authorId
        let findauthor = await authorModel.findById(authorId)
        // if(!authorId){
        //     return res.status(400).send({message : false , data : "AuthorId Invalid" })
        // }
        if (!findauthor) {
            return res.status(404).send({ messag: false, error: "Author not Found" })
        }
        else {
            const Blog = await blogModel.create(data)
            return res.status(201).send({ message: true, data: Blog })
        }
    } catch (error) {
        console.log({ err: error.message })
        return res.status(500).send({ message: false, error: error.message })
    }
}


// const getBlogs = async function (req, res) {
//     try {
//         let { authorId, category, tags, subcategory } = req.query

//         const blogsData = await blogModel.find({authorId : authorId}, {category: category},
//             {tags: tags}, {subcategory: subcategory})
//         return res.status(200).send({ message: true, data: blogsData })
//     }
//     catch (err) {
//         console.log({ err: err.message })
//         return res.status(500).send({ message: false, error: err.message })
//     }
// }

module.exports.createBlog = createBlog
// module.exports.getBlogs = getBlogs