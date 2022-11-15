const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { isValidId } = require("../Validator/validator");
const moment = require("moment");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    let isPublished = data.isPublished;
    if (Object.keys(data).length == 0) {
      return res.status(404).send({ status: false, data: "data Not Found" });
    }
    //AuthorId attributes present or not
    if (!authorId) {
      return res
        .status(400)
        .send({ status: false, data: "AuthorId is required" });
    }
    //validationForObjectId
    if (!isValidId(authorId)) {
      return res.status(400).send({ status: false, data: "Invalid AuthorId" });
    }
    let findauthor = await authorModel.findById(authorId);
    //Author data Exist or Not
    if (!findauthor) {
      return res.status(404).send({ status: false, data: "Author not Found" });
    }

    if (isPublished == true) {
      let testDate = Date.now();
      data["publishedAt"] = moment(testDate).format("MM/DD/YYYY");
      const Blog = await blogModel.create(data);
      return res.status(201).send({ status: true, data: Blog });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let queries = req.query;
    const blogsData = await blogModel.find(queries);
    if (blogsData.length == 0) {
      return res
        .status(404)
        .send({ status: false, data: "No blogs are found " });
    }
    for (let i = 0; i < blogsData.length; i++) {
      const element = blogsData[i];
      if (element.isDeleted == false && element.isPublished == true) {
        return res.status(200).send({ status: true, data: blogsData });
      }
    }
  } catch (err) {
    console.log({ err: err.message });
    return res.status(500).send({ status: false, error: err.message });
  }
};

const updateBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let blogdata = req.body;
    let { title, body, tags, subcategory } = req.body;
    console.log(blogId);
    console.log(blogdata);
    if (Object.keys(blogdata).length == 0) {
      return res
        .status(400)
        .send({ status: false, data: "Data not found in body" });
    }
    
    if (!isValidId(blogId)) {
      return res.status(400).send({ status: false, data: "Invalid blogId" });
    }
    let testDate = Date.now()
    let updatedBlog = await blogModel.findOneAndUpdate(

      { _id: blogId, isDeleted:false},
      {
        title: title,
        body: body,
        $set: {
          isPublished: true,
          publishedAt: moment(testDate).format("MM/DD/YYYY"),
        },
        $push: { tags: tags, subcategory: subcategory },
      },
      { new: true }
    );

    

    return res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let data = req.params.blogId;
    if (!isValidId(data)) {
      return res.status(404).send({ status: false, data: "Invalid blogId" });
    }
    let testDate = Date.now();
    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: data },
      {
        $set: {
          isDeleted: true,
          deletedAt: moment(testDate).format("MM/DD/YYYY"),
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res
        .status(404)
        .send({ status: false, msg: "blog document doesn't exist" });
    }
    return res.status(200).send({ status: true, data: {} });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const deleteBlogByQuery = async function (req, res) {
  try {
    let queries = req.query;

    if (Object.keys(queries) == 0) {
      return res.status(400).send({ status: false, msg: "query is required" });
    }

    let data = await blogModel.find(queries);

    if (data.length == 0) {
      return res.status(404).send({ status: false, msg: "document not found" });
    }
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      element.isDeleted = true;
    }
    return res.status(200).send({ status: true, data: {} });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery = deleteBlogByQuery;
