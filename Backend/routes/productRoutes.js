const express = require("express");
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
} = require("../controllers/productController");
const {
    isUserAuthenticated,
    authorizeRoles,
} = require("../middleware/authenticator");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
    .route("/products/new")
    .post(isUserAuthenticated, authorizeRoles('admin'), addProduct);
router
    .route("/products/:id")
    .get(getProductDetails)
    .put(isUserAuthenticated, authorizeRoles('admin'), updateProduct)
    .delete(isUserAuthenticated, authorizeRoles('admin'), deleteProduct);

module.exports = router;
