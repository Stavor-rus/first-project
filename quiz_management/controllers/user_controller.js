//Контроллер для работы с user
const user = require('../models/user'),
      passport = require('passport');

/*Валидация регистрационной формы, проверка на совпадения в базе
Запись нового пользователя в базу, если совпадений не найдено*/
module.exports.UserRegistration = function (req, res) {
    req.checkBody('InputRegName', 'Имя пользователя не может быть пустым.').notEmpty();
    req.checkBody('InputRegName', 'Имя пользователя должно содержать от 4 до 15 символов.').len(4, 15);
    req.checkBody('InputRegEmail', 'Email не может быть пустым.').notEmpty();
    req.checkBody('InputRegEmail', 'Некорректный email.').isEmail();
    req.checkBody('InputRegPassword', 'Пароль не может быть пустым.').notEmpty();
    req.checkBody('InputRegPassword', 'Пароль должен содержать от 8 до 100 символов.').len(8, 100);

    const errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    }

    else {

/*Если данные в форме верны, обращается к модулю CreateUser
В inputForm хранятся данные из формы*/
    const inputRegForm = {
            name: req.body.InputRegName,
            password: req.body.InputRegPassword,
            email: req.body.InputRegEmail
    };
        user.CreateUser(inputRegForm, function (err) {
            if (err){
                req.flash('error_msg', 'Пользователь с таким email уже существует');
                res.redirect('/register');
                console.log(err);
            }
            else {
                req.flash('success_msg', 'Вы успешно зарегистрированы, теперь можете авторизоваться');
                res.redirect('/login');
            }
        });
    }//else
};//Начало модуля


//Выводит сообщения об ошибках или авторизации
module.exports.UserLogin = function (req, res) {

//Если не верны
    passport.authenticate('local', function (err, user) {
        if (!user) {
            req.flash('error_msg', 'Неверный email или пароль');
            res.redirect('/login');
        }

// Если верны
        req.logIn(user, function () {
            req.flash('success_msg', 'Добро пожаловать!');
            res.redirect('/');
        });
    })
    (req, res);
};




















