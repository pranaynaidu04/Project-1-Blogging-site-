const jwt = require("jsonwebtoken");

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
    req.authorLoggedIn = decodedToken.authorId
    next();
  } catch (error) {
    return res.status(500).send({status:false, msg: error.message})
  }
};


module.exports.authenticate = authenticate;
