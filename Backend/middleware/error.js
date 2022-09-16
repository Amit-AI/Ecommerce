const errorHandler = require("../utils/errorHandler");

const errorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //mongodb dupicate key error
    if (err.code == "11000") {
        err.statusCode = 400;
        err.message = `${Object.keys(err.keyValue)} already exists!`;
    }

    //wrong mongodb id error
    if (err.name == "CastError") {
        err.statusCode = 400;
        err.message = "Invalid ID";
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message, 400);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        err.message = "Json Web Token is Expired";
        err.statusCode = 400;
    }
    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};

module.exports = errorMiddleWare;
