const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({status:false, msg: "token must be present" });
    }
    let decodedToken = jwt.verify(token, "Mini-Blogging-Project");
    if (!decodedToken) {
      return res.status(401).send({status:false, msg: "token is invalid" });
    }
    req.authorLoggedIn = decodedToken.authorId;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const authorise = async function (req, res, next) {
  try {
    let blogId = req.params.blogId;
    if (!blogId) {
      let authorId2 = req.query.authorId;
      console.log(authorId2);
      if (authorId2 != req.authorLoggedIn) {
        return res.status(403).send({status:false, msg: "you dont have access" });
      }
      next();
    } else {
      let blogs = await blogModel.findById(blogId);
      let authorId1 = blogs.authorId;
      console.log(authorId1);
      if (authorId1 != req.authorLoggedIn) {
        return res.status(403).send({status:false, msg: "you dont have access" });
      }
      next();
    }
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
