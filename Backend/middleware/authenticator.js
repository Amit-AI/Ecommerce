const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

/*-------------------------
    Handles resource access based on login status by checking token of a user
---------------------------*/

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies; //getting token that's stored in cookie

    if (!token) {
        return next(new ErrorHandler("Login required!", 401));
    }

    //decoding token, to check if current user is logged in
    //jwt.verify throws error if token doesn't match
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(user.id); //saving incoming user data to request object for future use

    next(); //exec the next callback func
});

/*-------------------------
    Handles resource access based on Roles of a user
---------------------------*/

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            //if not admin
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not entitled to access this resource`,
                    401
                )
            );
        }

        next(); //exec the next callback func
    };
};
