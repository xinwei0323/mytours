const path = require('path');
const express = require('express');
const morgan = require('morgan');


const app = express();

// morgan 可以印出每次路徑請求
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//Body Parser, reading data from body into req.body 
// 處理 application/json
app.use(express.json({ limit: '10kb' }));
// 處理 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Serving static files -> currentPath/public
app.use(express.static(path.join(__dirname, 'public')));

//測試 middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    // console.log(req.user);
    next();
});

module.exports = app;