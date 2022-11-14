const express = require("express")
const router = express.Router()
const authorController = require("../controller/authorController")

router.get('/test', function(req,res){
    res.send({data:"test api"})
})

router.post('/authors', authorController.createAuthor)

module.exports = router