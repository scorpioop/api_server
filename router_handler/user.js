const db = require("../db/index");
const mysqlssh = require("mysql-ssh");
const bcrypt = require("bcryptjs");

exports.regUser = (req, res) => {
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) {
    res.send({
      status: 1,
      message: "用户名或密码不合法",
    });
  } else {
    const sqlStr = "select * from ev_users where username= '";
    db()
      .then((client) => {
        client.query(
          sqlStr + userinfo.username + "'",
          function (err, results, fields) {
            if (err) throw err;
            console.log(results);
            if (results.length > 0) {
              res.send({
                status: 1,
                message: "用户名重复",
              });
            } else {
              userinfo.password = bcrypt.hashSync(userinfo.password, 10);
              console.log(userinfo);
              const sql = "insert into ev_users set ?";
              client.query(
                sql,
                { username: userinfo.username, password: userinfo.password },
                function (err, results) {
                  if (err) return res.send({ status: 1, message: err.message });
                  // SQL 语句执行成功，但影响行数不为 1
                  if (results.affectedRows !== 1) {
                    return res.send({
                      status: 1,
                      message: "注册用户失败，请稍后再试！",
                    });
                  }else{
                      // 注册成功
                    return res.send({ status: 0, message: "注册成功！" });
                  }
                }
              );
            }
            mysqlssh.close();
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
  }
};

exports.login = (req, res) => {
  res.send("login ok");
};
