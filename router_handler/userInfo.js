const db = require("../db/index");
const mysqlssh = require("mysql-ssh");
const bcrypt = require("bcryptjs");
const { result } = require("@hapi/joi/lib/base");
exports.getUserInfo=(req,res)=>{
    const sqlStr = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db().then((client)=>{
        client.query(sqlStr,req.user.id,(err, results)=>{
            if(err) return res.cc(err)
            if(results.length<1){
                mysqlssh.close()
                return res.cc("获取失败")
            }else{
                mysqlssh.close()
                return res.send({
                    status:0,
                    message:'成功',
                    data:results[0]

                })
            }
        })
    })
}
exports.updateUserInfo=(req,res)=>{
    const sqlStr = "update ev_users set ? where id=?"
    db().then((client)=>{
        client.query(sqlStr,[req.body,req.user.id],(err,results)=>{
            mysqlssh.close()
            if(err) return res.cc("修改失败")
            else{
                if(results.affectedRows!==1) {
                    mysqlssh.close() 
                    return res.cc("修改失败")}
                else {
                    mysqlssh.close()
                    return res.cc("更新成功",0)}
            }
        })
    })
    
}

exports.updatePwd=(req,res)=>{
    const sqlStr = "select * from ev_users where id = ?"
    db().then((client)=>{
        client.query(sqlStr,req.user.id,(err,results)=>{
            if(err){
                mysqlssh.close()
                return res.cc(err)
            }else{
                if(results.length<1){
                    mysqlssh.close()
                    return res.cc("用户不存在")
                }
                const pwd = results[0]?.password
                const compareResult=bcrypt.compareSync(req.body?.oldPwd,pwd)
                if(!compareResult){
                    mysqlssh.close()
                    return res.cc("旧密码不对")
                }else{
                    const sql="update ev_users set password=? where id=?"
                    const newPwd = bcrypt.hashSync(req.body?.newPwd,10)
                    client.query(sql,[newPwd,req.user.id],(err,results)=>{
                        if(err){
                            mysqlssh.close()
                            return res.cc(err)
                        }
                        if(results.affectedRows<1){
                            mysqlssh.close()
                            return res.cc("更新失败")
                        }
                        mysqlssh.close()
                        return res.cc("更新密码成功",0)

                    })
                }
               
            }
        })
    })
}