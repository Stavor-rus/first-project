//Node модули
const express = require('express'),
      session = require('express-session'),
      validator = require('express-validator'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      flash = require('connect-flash'),
      path = require('path'),
      passport = require('passport'),
      routes = require('./routes/routes'),
      config = require('./config/config'),
      passportconf = require('./auth/passportconf'),
      app = express();

//Загружаем View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Парсер форм и куки
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(cookieParser());

//express session
app.use(session(config.session));

//Подключение passport.js стратегии
passportconf(passport);

//Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

//express flash для flash сообщений
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//Запуск сервера на порту 3000
app.listen('3000', function () {
    console.log('Сервер запущен на порту :3000');
});

//Routes
app.use('/', routes);


module.exports = app;


