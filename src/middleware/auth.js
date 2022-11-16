const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ msg: "token must be present" });
    }
    let decodedToken = jwt.verify(token, "Mini-Blogging-Project");
    if (!decodedToken) {
      return res.status(401).send({ msg: "token is invalid" });
    }
    req.authorLoggedIn = decodedToken.authorId;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const authorise = async function (req, res, next) {
  try {
    let blogId = req.params.blogId
    
    let blogs = await blogModel.findById(blogId)
    let authorId = blogs.authorId
    if(!authorId){ 
      authorId=req.query.authorId
    }
    if (authorId != req.authorLoggedIn) {
      return res.status(403).send({ msg: "you dont have access" });
    }
    next();
  } catch (error) {
    return res.status(500).send({status:false, msg: error.message})
  }
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
