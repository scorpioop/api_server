const express = require("express");
const { required } = require("joi");
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
 * /my/upload/add:
 *    post:
 *      tags:
 *      - 文章
 *      summary: 上传图片
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
 *                 img:
 *                   type: string
 *                   format: binary
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
const uploadFile = require('../router_handler/uploadFile')
router.post('/add',upload.fields([{name:'img',maxCount:1}]),uploadFile.add)

module.exports=router