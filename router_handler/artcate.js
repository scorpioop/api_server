const db = require("../db/index");
const mysqlssh = require("mysql-ssh");
exports.getCategory = async (req, res) => {
  sqlStr = "select * from ev_article_cate where is_delete=0 order by id asc";
  const client = await db();
  client.query(sqlStr, (err, results) => {
    if (err) {
      mysqlssh.close();
      return res.cc(err);
    }
    mysqlssh.close();
    return res.send({
      status: 0,
      message: "获取文章分类列表成功！",
      data: results,
    });
  });
};
exports.addArticleCates = async (req, res) => {
  console.log(req.body);
  sql = "select * from ev_article_cate where name=? or alias =?";
  const client = await db();
  client.query(sql, [req.body?.name, req.body?.alias], (err, results) => {
    if (err) {
      mysqlssh.close();
      return res.cc(err);
    }
    if (results.length === 2)
      return res.cc("分类名称与别名被占用，请更换后重试！");
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    )
      return res.cc("分类名称与别名被占用，请更换后重试！");
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name)
      return res.cc("分类名称被占用，请更换后重试！");
    if (results.length === 1 && results[0].alias === req.body.alias)
      return res.cc("分类别名被占用，请更换后重试！");
    const sql = `insert into ev_article_cate set ?`
    client.query(sql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) {
        mysqlssh.close();
        return res.cc(err);
      }
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      mysqlssh.close()
      // 新增文章分类成功
      res.cc('新增文章分类成功！', 0)
    })

  });
  
};
exports.deleteCate=async(req,res)=>{
  sqlStr="update ev_article_cate set is_delete=1 where id=?"
  const client = await db();
  client.query(sqlStr,req.params.id,(err,results)=>{
    if (err) {
      mysqlssh.close();
      return res.cc(err);
      
    }
    if (results.affectedRows !== 1) {
      mysqlssh.close()
      return res.cc('删除分类失败！')}
    mysqlssh.close()
    // 新增文章分类成功
    return res.cc('删除文章分类成功！', 0)
  
  })
}
exports.getCateSingle=async(req,res)=>{
  sqlStr = "select * from ev_article_cate where id=?";
  const client = await db()
  client.query(sqlStr,req.params.id,(err,results)=>{
    if (err) {
      mysqlssh.close();
      return res.cc(err);
      
    }
    if(results.length<1){
      mysqlssh.close();
      return res.cc("获取失败");
    }
    mysqlssh.close();
    return res.send(
      {
        status:0,
        message:"获取成功",
        data:results[0]
      }
    )
  })
  
}
exports.updateCate=async(req,res)=>{
  sql=`select * from ev_article_cate where Id<>? and (name=? or alias=?)`
  const client = await db()
  client.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    console.log(results);
    // 分类名称 和 分类别名 都被占用
    if (results.length === 2)  {
      mysqlssh.close()
      return res.cc('分类名称与别名被占用，请更换后重试！')
    }
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
      mysqlssh.close()
      return res.cc('分类名称与别名被占用，请更换后重试！')}
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) {
      mysqlssh.close()
      return res.cc('分类名称被占用，请更换后重试！')}
    if (results.length === 1 && results[0].alias === req.body.alias) {
      mysqlssh.close()
      return res.cc('分类别名被占用，请更换后重试！')}
  
    // TODO：更新文章分类
    const sql = `update ev_article_cate set ? where Id=?`
    client.query(sql, [req.body, req.body.id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
    
      // 更新文章分类成功
      mysqlssh.close()
      return res.cc('更新文章分类成功！', 0)
    })
  })
  
}
