const express = require("express")
const router = express.Router()
const article = require('../router_handler/article')

router.post('/add', article.addArt)

module.exports=router