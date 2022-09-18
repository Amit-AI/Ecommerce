const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const productModel = require("../models/productModel");
const apiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// getAllProducts
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    // const products = await productModel.find();

    const apiSearch = new apiFeatures(productModel, req.query).search();

    // console.log(req.query)
    const products = await apiSearch.result;

    if (!products) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        products,
    });
});

//Create/Add a Product
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;

    data.user = req.user.id;

    const product = await productModel.create(req.body);

    if (!product) {
        return next(new ErrorHandler("Product Creation Failed", 400));
    }

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });
});

//update a product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const updateData = req.body;

    const product = await productModel.findByIdAndUpdate(
        req.params.id,
        updateData
    );

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
    });
});

//delete a product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

//get a product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(product);
});

// create/update product review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    //new review
    const review = {
        user: req.user._id, //"_id" gives object id, and only "id" gives string id
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await productModel.findById(productId);

    let reviewFound = false;

    //if review already present, update it
    product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user.id) { //used "id", instead of "_id"
            rev.rating = rating;
            rev.comment = comment;
            reviewFound = true;
        }
    });

    //if no previous reviews, add new one
    if (!reviewFound) {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    //find average of all ratings and update overall rating of a product

    let avgRating = 0;

    product.reviews.forEach((rev) => {
        avgRating += rev.rating;
    });

    product.ratings = avgRating / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `Review ${reviewFound?"updated":"added"} successfully`,
    });
});
