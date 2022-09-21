const express = require("express");
const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createReview,
    getAllReviews,
    deleteReview,
} = require("../controllers/productController");
const {
    isUserAuthenticated,
    authorizeRoles,
} = require("../middleware/authenticator");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
    .route("/product/new")
    .post(isUserAuthenticated, authorizeRoles("admin"), addProduct);
router
    .route("/product/:id")
    .get(getProductDetails)
    .put(isUserAuthenticated, authorizeRoles("admin"), updateProduct)
    .delete(isUserAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/review/add").put(isUserAuthenticated, createReview);
router
    .route("/admin/product/reviews/:id")
    .get(isUserAuthenticated, authorizeRoles("admin"), getAllReviews);

router
    .route("/admin/product/review/delete")
    .delete(isUserAuthenticated, authorizeRoles("admin"), deleteReview);
module.exports = router;
