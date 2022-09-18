const express = require("express");
const {
    registerUser,
    getUsers,
    deleteUser,
    updateUserDetails,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateProfileDetails,
    updateProfilePassword,
    getUserDetails,
} = require("../controllers/userController");

const {
    isUserAuthenticated,
    authorizeRoles,
} = require("../middleware/authenticator");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/mydetails").get(isUserAuthenticated, getUserProfile);
router
    .route("/mydetails/updatedetails")
    .put(isUserAuthenticated, updateProfileDetails);
router
    .route("/mydetails/updatepassword")
    .put(isUserAuthenticated, updateProfilePassword);
router
    .route("/admin/users")
    .get(isUserAuthenticated, authorizeRoles("admin"), getUsers);
router
    .route("/admin/user/:id")
    .get(isUserAuthenticated, authorizeRoles("admin"), getUserDetails)
    .put(isUserAuthenticated, authorizeRoles("admin"), updateUserDetails)
    .delete(isUserAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
