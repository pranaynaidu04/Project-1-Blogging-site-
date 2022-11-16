const { default: mongoose } = require("mongoose");
const authorModel = require("../models/authorModel");
const validator = require("../Validator/validator");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res.status(404).send({ status: false, data: "Data not Found" });
    }
    let email = data.emailId;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .send({ status: false, data: "Enter a valid EmailId" });
    }
    const created = await authorModel.create(data);
    res.status(201).send({ status: true, data: created });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ status: false, error: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let body = req.body;
    let { email, password } = req.body;

    if (Object.keys(body).length == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Data Not found inside body" });
    }

    let author = await authorModel.findOne({
      email: email,
      password: password,
    });

    if (!author) {
      return res
        .status(400)
        .send({ status: false, data: "email or password incorrect" });
    }

    let token = jwt.sign(
      {
        authorId: author._id.toString(),
        email: author.email,
        project: "Project1 Mini Blogging",
      },
      "Mini-Blogging-Project"
    );

    res.setHeader("x-api-key", token);

    return res.status(200).send({ status: true, data: token });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.loginUser = loginUser;
