const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 注册和登录表单的验证规则对象
const id = joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email= joi.string().email().required()

const avadar = joi.string().dataUri().required()
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}
exports.update_userinfo_schema={
  body:{
    nickname,
    email
  }
}

exports.update_pwd={
  body:{
    oldPwd:password,
    newPwd:joi.not(joi.ref('oldPwd')).concat(password)
  }
}

exports.update_avatar={
  body:{
    avadar
  }
}