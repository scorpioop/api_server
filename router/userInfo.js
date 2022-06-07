const express=require('express')
const router = express.Router()
const userInfo = require('../router_handler/userInfo')
const expressJoi=require('@escook/express-joi')
const userJoi = require('../schema/user')
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   ApiKeyAuth: 
 *     type: apiKey 
 *     in: header 
 *     name: Authorization 
 */

/**
 * @swagger
 * /my/userinfo:
 *    get:
 *      tags:
 *      - 用户
 *      summary: 获取用户信息
 *      security:
 *      - ApiKeyAuth: []
 *      produces:
 *      - application/json
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
router.get('/userinfo',userInfo.getUserInfo)
router.post('/userinfo',expressJoi(userJoi.update_userinfo_schema),userInfo.updateUserInfo)
router.post('/updatepwd',expressJoi(userJoi.update_pwd),userInfo.updatePwd)
router.post('/update/avatar',expressJoi(userJoi.update_avatar),userInfo.updateAvatar)

module.exports=router