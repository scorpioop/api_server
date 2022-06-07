
const express = require('express')
const router = express.Router()

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
// 定义参数
/**
 * @swagger
 * definitions:
 *  noticeAddParams:
 *      description: 通知添加参数
 *      properties:
 *          username:
 *              type: string    #参数类型
 *              description: 用户名     #参数描述
 *          password:
 *               type: string    #参数类型
 *               description: 密码     #参数描述
 *               minimun: 6
 *               maximum: 12
 *      example:        #请求参数样例。
 *           username: "admin"
 *           password: "123456"
 */
const user_handler=require('../router_handler/user')
/**,
 * @swagger
 * /api/reguser:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 注册
 *      produces:
 *      - application/json
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/noticeAddParams'
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


router.post('/reguser',expressJoi(reg_login_schema),user_handler.regUser)
/**,
 * @swagger
 * /api/login:
 *    post:
 *      tags:
 *      - 用户
 *      summary: 登录
 *      produces:
 *      - application/json
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/noticeAddParams'
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

router.post('/login',expressJoi(reg_login_schema),user_handler.login)

module.exports=router