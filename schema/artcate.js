const joi = require('joi')

const name = joi.string().alphanum().required()
const alias = joi.string().required()
const id = joi.number().min(1).required()

exports.add_cate_schema ={
  body:{
    name,
    alias
  }
}
exports.delete_cate_schema={
  params:{
    id
  }
}