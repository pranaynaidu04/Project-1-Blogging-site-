const { default: mongoose } = require("mongoose");
const authorModel = require("../models/authorModel");
const {
  isEmail,
  isValidString,
  isValidPassword,
} = require("../Validator/validator");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    const { fname, lname, title, email, password } = data;

    //check body empty and field empty or not

    if (Object.keys(data).length == 0)
      return res.status(404).send({ status: false, data: "Data not Found" });
    if (!fname)
      return res.status(400).send({ status: false, msg: "fname is required" });

    if (!isValidString(fname))
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide valid fname" });
    if (!lname)
      return res.status(400).send({ status: false, msg: "lname is required" });

    if (!isValidString(lname))
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide valid lname" });
    if (!title)
      return res.status(400).send({ status: false, msg: "title is required" });

    let titles = ["Mr", "Mrs", "Miss"];
    if (!titles.includes(title))
      return res.status(400).send({
        status: false,
        msg: "Please Provide valid title from :  Mr || Mrs || Miss",
      });

    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });
    if (!isEmail(email))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid EmailId" });

    const findEmail = await authorModel.findOne({ email: email });
    if (findEmail)
      return res
        .status(400)
        .send({ status: false, msg: "Enter Unique email Id" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        msg: "Password Must contain uppercase , lowercase , special character and number",
      });

    const created = await authorModel.create(data);
    return res.status(201).send({ status: true, data: created });
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
    if (!email)
      return res.status(400).send({ status: false, msg: "email is required" });
    if (!isEmail(email))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid EmailId" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        msg: "Enter a valid Password",
      });

    let author = await authorModel.findOne({
      email: email,
      password: password,
    });

    if (!author) {
      return res
        .status(401)
        .send({ status: false, msg: "email or password incorrect" });
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

module.exports = { createAuthor, loginUser };
