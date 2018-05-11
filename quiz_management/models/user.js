const config = require('../config/config'),
      mysql = require('mysql'),
      con = mysql.createConnection(config.mysql),
      bcrypt = require('bcryptjs'),
      salt = bcrypt.genSaltSync(10);

//Подключение к БД
con.connect(function (err) {
    if (err) {
        console.error('Ошибка подключения: ' + err.stack);
        return;
    }
    console.log('Подключение к БД успешно');
});

//Проверяет есть ли пользователь в базе
module.exports.CreateUser = function (inputRegForm, callback) {

    const checkUser = "SELECT * FROM `users` WHERE `user_email` = ('" + inputRegForm.email + "')";
    con.query(checkUser, function (err, results) {

//Если пользователя нет, заносит в базу
    if (results == '') {
        bcrypt.hash(inputRegForm.password, salt, function (err, hash) {

            const addUser = "INSERT INTO `users` (`user_name`, `user_password`, `user_email`) VALUES ('" + inputRegForm.name + "', '" + hash + "', '" + inputRegForm.email + "')";
            con.query(addUser, function (err, result) {
                if (err) throw err;
                callback (null, true);
            });
        });
    } //if
        else {
        callback (true);
    }
  });
}; //Начало модуля CreateUser


//Ищет пользователя в базе и проверяет введённые данные с данными в БД
//Обращается к базе, ищет пользователя по email
module.exports.getUserByEmail = function (username, callback) {
    const findUser = "SELECT * FROM `users` WHERE `user_email` = ('" + username + "')";
    con.query(findUser, function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
};

//Сравнивает введённые пароли с базой
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
  };





