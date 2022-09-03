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

//get all the product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json(product);
});
