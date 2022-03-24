const express = require('express')
const router = express.Router()
const artcate = require('../router_handler/artcate')
const expressJoi = require('@escook/express-joi')
const artcateSchema = require('../schema/artcate')

router.get('/cates',artcate.getCategory)
router.post('/addcates', expressJoi(artcateSchema.add_cate_schema),artcate.addArticleCates)
router.get('/deletecate/:id',expressJoi(artcateSchema.delete_cate_schema),artcate.deleteCate)
router.get('/cates/:id',expressJoi(artcateSchema.delete_cate_schema),artcate.getCateSingle)
router.post('/updatecate',expressJoi(artcateSchema.update_cate),artcate.updateCate)
module.exports=router