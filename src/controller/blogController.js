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

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
