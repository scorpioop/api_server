const express = require("express")
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname,'../uploads'));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1]);
    }
  });
  /**,
 * @swagger
 * /my/article/add:
 *    post:
 *      tags:
 *      - 文章
 *      summary: 添加文章
 *      consumes:
 *      - multipart/form-data
 *      produces:
 *      - application/json
 *      security:
 *      - ApiKeyAuth: []
 *      requestBody:
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   required: true
 *                 cover_img:
 *                   type: string
 *                   format: binary
 *                 content_file:
 *                   type: string
 *                   format: binary
 *                 state:
 *                   type: string
 *                 cate_id:
 *                    type: integer
 *                 content:
 *                   type: string
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */
const upload = multer({ storage: storage })
const router = express.Router()
const article = require('../router_handler/article')
const article_schema = require('../schema/article')
const expressJoi = require('@escook/express-joi')

router.post('/add', upload.fields([{name:'cover_img',maxCount:1},{name:'content_file',maxCount:1}]),expressJoi(article_schema.addArticle),article.addArt)

module.exports=router