const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter product name"]
    },
    category:{
        type: String,
        required: [true, "Please enter product category"]
    }
});

const productsModel = mongoose.model('product', productSchema);

module.exports = productsModel;
