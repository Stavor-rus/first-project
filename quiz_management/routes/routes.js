const express = require('express'),
      router = express.Router(),
      user_controller = require('../controllers/user_controller');


/**************
*             *
* GET ЗАПРОСЫ *
*             *
**************/

//Домашняя страница
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Добро пожаловать в Quizzes And Questions!'});
});

//Страница логина
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Вход в систему'});
});

//Страница регистрации
router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Регистрация пользователя'});
});

/****************
 *              *
 * POST ЗАПРОСЫ *
 *              *
 ***************/

//Регистрация пользователя
router.post('/register', user_controller.UserRegistration);



module.exports = router;
