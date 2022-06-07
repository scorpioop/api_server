const joi=require('joi')

const title = joi.string().required()

const cate_id = joi.number().integer().min(1).required()

const state = joi.string().valid('已发布', '草稿').required()
const content = joi.string().min(0)

const article_id = joi.number().integer().required()

exports.addArticle = {
    body:{
        title,
        cate_id,
        state,
        content
    }
}

exports.updateArticle = {
    body:{
        article_id,
        title,
        cate_id,
        state,
        content
    }
}