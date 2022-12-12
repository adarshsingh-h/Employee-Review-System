const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//rendering signup page
router.get("/signup", authController.getSignUp);

//rendering signin page
router.get("/signin", authController.getSignIn);

//posting  signin data
router.post("/signin", authController.postSignIn);

//posting signup data
router.post("/signup", authController.postSignUp);

module.exports = router;
