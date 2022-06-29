const joi=require('joi')

const title = joi.string().required()

const state = joi.string().valid('发布', '草稿').required()
const content = joi.string().min(0)

const article_id = joi.number().integer().required()

exports.addArticle = {
    body:{
        title,
        state,
        content
    }
}

exports.updateArticle = {
    body:{
        article_id,
        title,
        state,
        content
    }
}