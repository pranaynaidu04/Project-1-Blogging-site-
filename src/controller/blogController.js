const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { isValidId } = require("../Validator/validator");
const moment = require("moment");

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    if (Object.keys(data).length == 0) {
      return res.status(404).send({ status: false, msg: "data Not Found" });
    }
    //AuthorId attributes present or not
    if (!authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AuthorId is required" });
    }
    //validationForObjectId
    if (!isValidId(authorId)) {
      return res.status(400).send({ status: false, msg: "Invalid AuthorId" });
    }
    let findauthor = await authorModel.findById(authorId);
    //Author data Exist or Not
    if (!findauthor) {
      return res.status(404).send({ status: false, msg: "Author not Found" });
    }
    let isPublished = data.isPublished;
    if (isPublished == true) {
      let testDate = Date.now();
      data["publishedAt"] = moment(testDate);
    }
    const Blog = await blogModel.create(data);
    return res.status(201).send({ status: true, data: Blog });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let queries = req.query;
    const blogsData = await blogModel.find({
      $and: [{ isDeleted: false, isPublished: true }, queries],
    });

    if (blogsData) {
      return res.status(200).send({ status: true, data: blogsData });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "No blogs are found " });
    }
  } catch (err) {
    console.log({ err: err.message });
    return res.status(500).send({ status: false, error: err.message });
  }
};

const updateBlogs = async function (req, res) {
  try {
    let blogdata = req.body;
    let { title, body, tags, subcategory } = req.body;
    if (Object.keys(blogdata).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Data not found in body" });
    }
    let blogId = req.params.blogId;
    if (!isValidId(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid blogId" });
    }
    let blogs = await blogModel.findById(blogId);
    if (!blogs) return res.status(404).send({ status: false, msg: "Blogs not found" })

    let authorId = blogs.authorId
    if (authorId != req.decoded.authorId) return res.status(403).send({ status: false, msg: "you dont have access" })

    let testDate = Date.now();
    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        title: title,
        body: body,
        $set: {
          isPublished: true,
          publishedAt: moment(testDate),
        },
        $push: { tags: tags, subcategory: subcategory },
      },
      { new: true }
    );
    if (updatedBlog.isDeleted == true) {
      return res.status(404).send({ status: false, msg: "blog not found" });
    }
    return res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    if (!isValidId(blogId)) {
      return res.status(404).send({ status: false, msg: "Invalid blogId" });
    }
    let blogs = await blogModel.findById(blogId);
    if (!blogs) return res.status(404).send({ status: false, msg: "Blogs not found" })

    let authorId = blogs.authorId
    if (authorId != req.decoded.authorId) return res.status(403).send({ status: false, msg: "you dont have access" })

    let testDate = Date.now();
    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        $set: {
          isDeleted: true,
          deletedAt: moment(testDate),
        },
      },
      { new: true }
    );
    if (!updatedBlog) { return res.status(404).send({ status: false, msg: "blog document doesn't exist" }); }

    return res.status(200).send({ status: true, data: {} });

  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const deleteBlogByQuery = async function (req, res) {
  try {
    let queries = req.query;
    if (Object.keys(queries).length == 0) {
      return res.status(400).send({ status: false, msg: "query is required" });
    }

    let authorId = queries.authorId;
    if (!isValidId(authorId)) return res.status(404).send({ status: false, msg: "Invalid authorId" })

    if (authorId !== req.decoded.authorId) return res.status(403).send({ status: false, msg: "you don't have access" });

    let testDate = Date.now();
    const deleteData = await blogModel.updateMany(
      { $and: [queries, { isDeleted: false }] },
      { $set: { isDeleted: true, deletedAt: moment(testDate) } },
      { new: true }
    );
    if (deleteData.length == 0) return res.status(404).send({ status: false, msg: "No blog are found for Update" });

    return res.status(200).send({ status: true, data: {} });

  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery = deleteBlogByQuery;
