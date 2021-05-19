class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        console.log('123')
        Error.captureStackTrace(this, this.constructor);
   
        // 如果没有向captureStackTrace传递参数this.constructor，则在访问.stack属性时，
        // this.constructor及其内部信息将会出现在堆栈信息中。
        // 当传递this.constructor参数时，这些信息会被忽略。
    }
}

module.exports = AppError;