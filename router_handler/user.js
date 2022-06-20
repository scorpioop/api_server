const db = require("../db/index");
const mysqlssh = require("mysql-ssh");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
  const userinfo = req.body;

  const sqlStr = "select * from ev_users where username= '";
  db()
    .then((client) => {
      client.query(
        sqlStr + userinfo.username + "'",
        function (err, results, fields) {
          if (err) throw err;

          if (results.length > 0) {
            mysqlssh.close();
            return res.cc("用户名重复");
          } else {
            userinfo.password = bcrypt.hashSync(userinfo.password, 10);
            const sql = "insert into ev_users set ?";
            client.query(
              sql,
              { username: userinfo.username, password: userinfo.password },
              function (err, results) {
                if (err) {
                  return res.send({ status: 1, message: err.message });
                }
                // SQL 语句执行成功，但影响行数不为 1
                if (results.affectedRows !== 1) {
                  mysqlssh.close();
                  return res.cc("注册用户失败，请稍后再试！");
                } else {
                  // 注册成功
                  mysqlssh.close();
                  return res.cc("注册成功！", 0);
                }
              }
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: 1,
        message: "用户名或密码不合法",
      });
    });
};

exports.login = (req, res) => {
  const sqlStr="select * from ev_users where username=?"
  db().then((client)=>{
    client.query(sqlStr, req.body?.username,function (err,results,fields) {
      if(err){
        return res.cc(err)
      }else{
        if(results.length>=1){
          let pwd = results[0]?.password
          const compareResult=bcrypt.compareSync(req.body?.password,pwd)
          mysqlssh.close()
          if(!compareResult){
            return res.cc("登录失败")
          }else{
            let user = {...results[0],password:'',user_pic:""}
            const tokenStr = jwt.sign(user, config.jwtSecretKey,{expiresIn:'10h'})
            return res.send({
              status:0,
              message:"登录成功",
              token:"Bearer "+tokenStr
            })
          }
         
        }else{
          mysqlssh.close();
          return res.cc("没有该用户")
        }
      }
      
    })
  })
};
var axios = require('axios');
  
exports.wxlogin=async(req,res)=>{
  console.log(req.body);
  let code = req.body.code
  const result =await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wxa5cd2b4149991741&secret=a1d9ddf42f15ee5aed33305ede280b43&js_code=${code}&grant_type=authorization_code`)
  console.log(result.data);
  const sqlStr = "select * from ev_users where username= '";
  db()
    .then((client) => {
      client.query(
        sqlStr + result?.data?.openid + "'",
        function (err, results, fields) {
          if (err) throw err;

          if (results.length > 0) {
            const tokenStr = jwt.sign({opena_id:result?.data?.openid,nickname:result?.body?.userinfo?.nickName}, config.jwtSecretKey,{expiresIn:'10h'})
            return res.send({
              status:0,
              message:"登录成功",
              token:"Bearer "+tokenStr
            })
            
          } else {
            
            const sql = "insert into ev_users set ?";
            client.query(
              sql,
              { username: userinfo.username, password: userinfo.password },
              function (err, results) {
                if (err) {
                  return res.send({ status: 1, message: err.message });
                }
                // SQL 语句执行成功，但影响行数不为 1
                if (results.affectedRows !== 1) {
                  mysqlssh.close();
                  return res.cc("注册用户失败，请稍后再试！");
                } else {
                  // 注册成功
                  mysqlssh.close();
                  return res.cc("注册成功！", 0);
                }
              }
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: 1,
        message: "用户名或密码不合法",
      });
    });
  return res.send({status:0,
    message:"登录成功"})
}