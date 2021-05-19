const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 用 dotenv 來載入環境變數，path 可以選載入的路徑
dotenv.config({ path: `./config.env` });

//引用app
const app = require('./app');

// 把連接mongodb的URL放到環境變數
// const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(`mongodb+srv://allen:picBeOJf4jW1r5oF@cluster0.kk40x.mongodb.net/natours?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful !!!!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});