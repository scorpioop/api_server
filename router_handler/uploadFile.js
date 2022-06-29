const path= require('path')
const db = require("../db/index");
const mysqlssh = require("mysql-ssh");

exports.add=async(req,res)=>{
    let need={}
    if(req.files["img"]){
    need={img_url:'api/uploads'+'/'+req.files["img"][0].filename}
  }
  return res.send({
    status:0,
    message:"上传成功",
    data:need
  })
}