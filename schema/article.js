const joi=require('joi')

const title = joi.string().required()

const cate_id = joi.number().integer().min(1).required()

const state = joi.string().valid('已发布', '草稿').required()
const content = joi.string()

exports.addArticle = {
    body:{
        title,
        cate_id,
        state,
        content
    }
}