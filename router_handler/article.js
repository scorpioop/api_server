const path= require('path')
const db = require("../db/index");
const mysqlssh = require("mysql-ssh");

exports.addArt=async(req,res)=>{
  
  let need = {
    ...req.body,
    cover_img:path.join('/uploads',req.files["cover_img"][0].filename),
    publish_date:new Date(),
    author_id:req.user.id,
    
  }
  if(req.files["content_file"]){
    need={...need,content_file:path.join('/uploads',req.files["content_file"][0].filename),}
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