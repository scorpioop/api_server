const path= require('path')
const db = require("../db/index");
const mysqlssh = require("mysql-ssh");

exports.addArt=async(req,res)=>{
  
  let need = {
    ...req.body,
    publish_date:new Date(),
    author_id:req.user.id,
    
  }
  if(req.files["cover_img"]){
    need={...need,content_file:path.join('/uploads',req.files["cover_img"][0].filename),}
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
exports.updateArt=async(req,res)=>{
  const client = await db()
  const sqlStr = "select * from ev_articles where id=? and author_id=?"
  client.query(sqlStr,[req.body.article_id,req.user.id],(err, result)=>{
    if(err){
      mysqlssh.close()
      return res.cc(err)
    }
    if(result.length===1){
      let need = {
        ...req.body,
        publish_date:new Date(),
        author_id:req.user.id,
        article_id:null
      }
      delete need.article_id
      if(req.files["cover_img"]){
        need={...need,content_file:path.join('/uploads',req.files["cover_img"][0].filename),}
      }
      if(req.files["content_file"]){
        need={...need,content_file:path.join('/uploads',req.files["content_file"][0].filename),}
      }
      const sqlStr = "update ev_articles set ? where id=?"
      client.query(sqlStr,[need,req.body.article_id],(err,result)=>{
        if(err){
          mysqlssh.close()
          return res.cc(err)
        }
        if(result.affectedRows!==1){
          mysqlssh.close()
          return res.cc("更新失败")
        }
        return res.cc("更新成功",0)
      })
    }else{
      return res.cc("更新失败")
    }
  })
}