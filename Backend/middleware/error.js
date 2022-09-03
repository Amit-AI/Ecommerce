const errorHandler = require('../utils/errorHandler');

const errorMiddleWare = (err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.code=="11000"){
        err.statusCode = 400;
        err.message = "Duplicate Key Error";
    }

    if(err.name=="CastError"){
        err.statusCode = 400;
        err.message = "Invalid ID";
    }
    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}

module.exports = errorMiddleWare;