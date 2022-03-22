const express=require('express')
const router = express.Router()
const userInfo = require('../router_handler/userInfo')
const expressJoi=require('@escook/express-joi')
const userJoi = require('../schema/user')

router.get('/userinfo',userInfo.getUserInfo)
router.post('/userinfo',expressJoi(userJoi.update_userinfo_schema),userInfo.updateUserInfo)
router.post('/updatepwd',expressJoi(userJoi.update_pwd),userInfo.updatePwd)
router.post('/update/avatar',expressJoi(userJoi.update_avatar),userInfo.updateAvatar)

module.exports=router