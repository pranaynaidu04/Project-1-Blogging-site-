const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

/*****************************Authentication**************************************/
const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "token must be present" });
    }
    jwt.verify(token, "Mini-Blogging-Project", (err, decoded) => {
      if (err) {
        return res.status(401).send({ status: false, msg: err.message });
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authenticate = authenticate;
