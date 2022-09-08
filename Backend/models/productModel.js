const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter product name"]
    },
    category:{
        type: String,
        required: [true, "Please enter product category"]
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const productsModel = mongoose.model('product', productSchema);

module.exports = productsModel;
