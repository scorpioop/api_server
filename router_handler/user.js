const db = require("../db/index");
const mysqlssh = require("mysql-ssh");
const bcrypt = require("bcryptjs");

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
    client.query(sqlStr, req.body?.username,function (err,results) {
      if(err){
        return res.cc(err)
      }else{
        if(results.length>=1){
          let pwd = results[0]?.password
          console.log(pwd);
          mysqlssh.close()
        }else{
          mysqlssh.close();
          return res.cc("没有该用户")
        }
      }
      
    })
  })
};
