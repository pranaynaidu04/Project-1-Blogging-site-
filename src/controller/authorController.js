const { default: mongoose } = require('mongoose')
const authorModel = require('../models/authorModel')

const createAuthor = async function (req, res) {
    try {
    let data = req.body
    const created = await authorModel.create(data)
    res.status(201).send({ status: true, data: created})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({status:false, error: error.message})
    }
}  

module.exports.createAuthor = createAuthor