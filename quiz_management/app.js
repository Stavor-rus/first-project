const express = require('express'),
      session = require('express-session'),
      validator = require('express-validator'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      flash = require('connect-flash'),
      path = require('path'),
      routes = require('./routes/routes'),
      config = require('./config/config'),
      app = express();

//Загружаем View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Парсер форм и куки
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());
app.use(cookieParser());
app.use(flash());

//Запуск сервера на порту 3000
app.listen('3000', function () {
    console.log('Сервер запущен на порту :3000');
});

//Routes
app.use('/', routes);


module.exports = app;


