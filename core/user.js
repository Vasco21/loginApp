const pool = require('./pool')
const bcrypt = require('bcrypt');


    function User() {};
    
    User.prototype = {
        // find user data by id or username
        find : function(user = mull, callback)
        {
            // if user = number field = id if user = string return field = username
            if(user){
                var field = Number.isInteger(user) ? 'id' : 'username';
            }

            let sql = `select * from id_user where ${field} = ?`;
            pool.query(sql, user, function(err, result){
                  if(err) throw err
                  callback(result);
            });
        }, 

        create : function(body, callback){
            let pwd = body.password;
            body.password = bcrypt.hashSync(pwd,10);

            var bind = [];

            for(prop in body){
                bind.push(prop);
            }

            let sql = `insert into id_user(username, fullname, password) value(?, ?, ?)`;

            pool.query(sql, bind, function(err, lastId){
                if(err) throw err;
                callback(lastId);
            })
        },
        login : function(username, password, callback){
            this.find(username, function(user){
                if(user){
                    if(bcrypt.compareSync(password, result.password)){
                        callback(user);
                        return;
                    }
                }
                callback(null);
            })
        }
    }

    module.exports = User;   

