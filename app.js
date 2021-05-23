const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const multer = require('multer');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// ROUTE
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const viewRouter = require("./routes/viewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// template use pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
//Set Security HTTP headers
// app.use(helmet());
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

// app.use(cors());

// morgan 可以印出每次路徑請求
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour'
})
app.use('/api', limiter);



// Body Parser, reading data from body into req.body
// 處理 application/json
app.use(express.json({ limit: "10kb" }));
// 處理 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Serving static files -> currentPath/public
app.use(express.static(path.join(__dirname, "public")));
// access req.cookies.XXXX  
app.use(cookieParser())

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);

//測試 middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    // console.log(req.file);
    next();
});

app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// 出現額外的url時
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
