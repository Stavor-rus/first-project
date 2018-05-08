//Контроллер для работы с user
const user = require('../models/user');
const passport = require('passport');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const config = require('../config/config');


//Если данные верны, заносит в базу, если нет, показывает ошибки
module.exports.UserRegistration = function (req, res) {
    req.checkBody('InputName', 'Имя пользователя не может быть пустым.').notEmpty();
    req.checkBody('InputName', 'Имя пользователя должно содержать от 4 до 15 символов.').len(4, 15);
    req.checkBody('InputEmail', 'Email не может быть пустым.').notEmpty();
    req.checkBody('InputEmail', 'Некорректный email.').isEmail();
    req.checkBody('InputPassword', 'Пароль не может быть пустым.').notEmpty();
    req.checkBody('InputPassword', 'Пароль должен содержать от 8 до 100 символов.').len(8, 100);

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {

    const inputForm = {
            name: req.body.InputName,
            password: req.body.InputPassword,
            email: req.body.InputEmail
    };

        user.CreateUser(inputForm, function (err, hash) {
            console.log(hash);
            //res.send(hash);
            req.flash('success_msg', 'Вы успешно зарегестрированы, теперь можете авторизоваться');
            res.redirect('/login');
        });



    }//else
};

















