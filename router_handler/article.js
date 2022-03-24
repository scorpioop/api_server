const path= require('path')
const db = require("../db/index");
const mysqlssh = require("mysql-ssh");

exports.addArt=async(req,res)=>{
  const need = {
    ...req.body,
    cover_img:path.join('/uploads',req.file.filename),
    publish_date:new Date(),
    author_id:req.user.id
  }
  const sqlStr="insert into ev_articles set ?"
  const client = await db()
  client.query(sqlStr,need,(err,results)=>{
    if(err){
      mysqlssh.close()
      return res.cc(err)
    }
    if(results.affectedRows!==1){
      mysqlssh.close()
      return res.cc("发布失败")
    }
    return res.cc("发布成功",0)
  })
  
}