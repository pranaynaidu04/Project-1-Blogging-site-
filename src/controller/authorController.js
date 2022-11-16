const { default: mongoose } = require('mongoose')
const authorModel = require('../models/authorModel')
const validator = require('../Validator/validator')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
    let data = req.body
    if(Object.keys(data).length == 0){
        return res.status(404).send({status : false , data : "Data not Found"})
    }
    let email = data.emailId
    if(!validator.isEmail(email)){
        return res.status(400).send({status: false, data: "Enter a valid EmailId"})
    }
    const created = await authorModel.create(data)
    res.status(201).send({ status: true, data: created})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({status:false, error: error.message})
    }
}  

const loginUser = async function(req,res){
    let userName = req.body.emailId;
    let password = req.body.password;
    
    let user = await authorModel.findOne({})
  }

module.exports.createAuthor = createAuthor