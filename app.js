const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require("cookie-parser");



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

// morgan 可以印出每次路徑請求
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors());

// access req.cookies.XXXX  
app.use(cookieParser())
// Body Parser, reading data from body into req.body
// 處理 application/json
app.use(express.json({ limit: "10kb" }));
// 處理 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Serving static files -> currentPath/public
app.use(express.static(path.join(__dirname, "public")));

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
