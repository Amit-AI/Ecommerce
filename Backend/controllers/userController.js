const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtTokenUtil");
const sendEmail = require("../utils/sendEmailUtil");
const crypto = require("crypto");
const { isErrored } = require("stream");

/*-------------------------
    Register a user
---------------------------*/
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await userModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample id",
            url: "profile pic url",
        },
    });

    if (!user) {
        return next(new ErrorHandler("Data Input", 400));
    }

    const token = user.generateJWTToken();

    sendToken(user, res, 201, "User registered successfully"); //creates JWT token and stores in cookie
});

/*---------------------------------------------
    Handles user login(email and password check)
------------------------------------------------*/

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email or password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password"); //to select password also + is used, otherwise password won't be selected automatically to be compared

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, res, 200, "Login successful");
});

/*-------------------------
    logout user
---------------------------*/

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully!",
    });
});

/*-------------------------
    Forgot password
---------------------------*/

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    //get password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://${req.get(
        "host"
    )}/api/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!`,
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }
});

/*-------------------------
    Reset Password
---------------------------*/

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //hashing token, because it's stored in the database in hashed form
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    console.log(req.params.token);

    const user = await userModel.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset password token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.password;

    //if password is reset, then there shoudn't be any password reset token present
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    sendToken(user, res, 200, "Your password has been reset"); //sending new token for user login
});

/*-------------------------
    Get User Profile Details
---------------------------*/

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        user,
    });
});

/*-------------------------
    Update user profile details
---------------------------*/

exports.updateProfileDetails = catchAsyncErrors(async (req, res, next) => {
    const updateData = req.body;

    const user = await userModel.findByIdAndUpdate(req.user._id, updateData);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    sendToken(user, res, 200, "Profile details updated successfully");
});

/*-------------------------
    Update user profile password
---------------------------*/

exports.updateProfilePassword = catchAsyncErrors(async (req, res, next) => {
    console.log(req);
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match!"));
    }

    const user = await userModel
        .findOne({ email: req.user.email })
        .select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid old password", 401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, res, 200, "Password updated successfully");
});

/*-------------------------
    Get all users (ADMIN)
---------------------------*/

exports.getUsers = catchAsyncErrors(async (req, res) => {
    const users = await userModel.find();

    res.status(200).json(users);
});

/*-------------------------
    Update user details (ADMIN)
---------------------------*/

exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
    const updateData = req.body;

    const user = await userModel.findByIdAndUpdate(req.params.id, updateData);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "User details updated successfully",
        updateData,
    });
});

/*-------------------------
 Delete a user (ADMIN)
---------------------------*/

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    user = await userModel.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user,
    });
});
