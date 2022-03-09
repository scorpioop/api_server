const mysqlssh = require('mysql-ssh');
const fs = require('fs');
const path = require('path');


const db=()=>{
    return mysqlssh.connect(
        {
            host: '18.116.235.123',
            user: 'ubuntu',
            privateKey: fs.readFileSync(path.resolve(__dirname,'awsKey.pem'))
        },
        {
            host: 'ec2-18-116-235-123.us-east-2.compute.amazonaws.com',
            user: 'zoe',
            password: 'Lxy961120',
            database: 'apiServer'
        }
    )
}
module.exports=db