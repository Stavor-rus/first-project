const config = require('../config/config'),
      flash = require('connect-flash'),
      mysql = require('mysql'),
      bcrypt = require('bcryptjs'),
      salt = bcrypt.genSaltSync(10);

//Подключение к БД
const con = mysql.createConnection(config.mysql);
con.connect(function (err) {
    if (err) {
        console.error('Ошибка подключения: ' + err.stack);
        return;
    }
    console.log('Подключение к БД успешно');
});

//Заносит пользователя в базу
module.exports.CreateUser = function (inputForm, callback){

    bcrypt.hash(inputForm.password, salt, function(err, hash) {
        const sql = "INSERT INTO `users` (`user_name`, `user_password`, `user_email`) VALUES ('" + inputForm.name + "', '" + hash + "', '" + inputForm.email + "')";
callback(null, hash);
        con.query(sql, function (err, result) {

        });
    });
};








//con.query('SELECT * FROM `users` WHERE `user_email` = ?', newUser.email, function (error, results) {
//    if (results == '') {
//        bcrypt.hash("password", salt, function (err, hash) {
//            var sql = 'INSERT INTO users SET ?';
//            var userValues = {user_email: email, user_password: hash, user_name: name};
//            con.query(sql, userValues, function (err) {
//                if (err) throw err;
//            });
//        });
//    }
//});