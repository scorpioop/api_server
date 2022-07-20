const joi=require('joi')

const title = joi.string().required()

const state = joi.string().valid('发布', '草稿').required()
const content = joi.string().min(0)

const id = joi.number().integer()

exports.addArticle = {
    body:{
        title,
        state,
        content,id
    }
}

exports.updateArticle = {
    body:{
        id,
        title,
        state,
        content
    }
}