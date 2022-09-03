const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtTokenUtil");

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

    const token = user.getJWTToken();

    sendToken(user, res, 201, "User registered successfully"); //creates JWT token and stores in cookie
});

/*-------------------------
    Handles user login(email and password check)
---------------------------*/

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email or password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

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
    Get all users
---------------------------*/

exports.getUsers = catchAsyncErrors(async (req, res) => {
    const users = await userModel.find();

    res.status(200).json(users);
});

/*-------------------------
    Update user details
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
 Delete a user
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
