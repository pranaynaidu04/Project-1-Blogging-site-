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
    authorLoggedIn = req.decoded.authorId
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};


module.exports.authenticate = authenticate;
