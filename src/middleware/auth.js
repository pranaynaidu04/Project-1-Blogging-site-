const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "token must be present" });
    }
    let decodedToken = jwt.verify(
      token,
      "Mini-Blogging-Project",
      (err, decoded) => {
        if (err) {
          return res.status(401).send({ status: false, msg: err.message });
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
    req.authorLoggedIn = req.decoded.authorId;
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const authorise = async function (req, res, next) {
  try {
    let authorId1 = req.query.authorId;
    let authorLogin = req.decoded.authorId;
    let blogId = req.params.blogId
    if(blogId){
      let blogs = await blogModel.findById(blogId);
      let authorId1 = blogs.authorId;
      console.log(authorId1);
      if (authorId1 != req.authorLoggedIn) {
        return res
          .status(403)
          .send({ status: false, msg: "you dont have access" });
      }
      next();
    }else{
      if (authorId1 != authorLogin) {
        return res
          .status(403)
          .send({ status: false, msg: "you don't have access" });
      }
      next();
    }
    
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
