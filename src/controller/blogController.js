const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { query } = require("express");
const { isValidObjectId } = require("mongoose").Types.ObjectId;
const { isValidId } = require("../Validator/validator")

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    if (!authorId) {
      return res
        .status(400)
        .send({ message: false, data: "AuthorId is required" });
    }
    //validationForObjectId
    if (!isValidId(authorId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid AuthorId" });
    }

    let findauthor = await authorModel.findById(authorId);

    if (!findauthor) {
      return res.status(404).send({ messag: false, error: "Author not Found" });
    }

    // if(published)   {
    //     data['publishedAt'] = datedalo
    //  }

      const Blog = await blogModel.create(data);
      return res.status(201).send({ message: true, data: Blog });
    

 //published


  } catch (error) {
    // console.log({ err: error.message })
    return res.status(500).send({ message: false, error: error.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    // let authorId = req.query.authorId
    // let category = req.query.category
    // let tags = req.query.tags
    // let subcategory = req.query.subcategory

    let queries = req.query;
    //console.log(queries)
    console.log(queries.tags);
    const blogsData = await blogModel.find(queries);
    console.log(blogsData);

    return res.status(200).send({ message: true, data: blogsData });
  } catch (err) {
    console.log({ err: err.message });
    return res.status(500).send({ message: false, error: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
