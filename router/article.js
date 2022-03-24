const express = require("express")
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'../uploads'));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
  });
const upload = multer({ storage: storage })
const router = express.Router()
const article = require('../router_handler/article')
const article_schema = require('../schema/article')
const expressJoi = require('@escook/express-joi')

router.post('/add', upload.single('cover_img'),expressJoi(article_schema.addArticle),article.addArt)

module.exports=router