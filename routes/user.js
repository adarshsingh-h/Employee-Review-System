const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//rendering dashboard
router.get("/dashboard", userController.getDashboard);

//assigning reviewer to an employee
router.get("/assign-review", userController.assignReviews);

//posting the assignment data
router.post("/assign-reviews", userController.postAssignReviews);

//rendering the review page
router.get("/review", userController.getReview);

//posting the review data
router.post("/post-review", userController.postReview);

//displaying all the reviews to admin
router.get("/reviews", userController.getReviews);

//updating a review of an employee by admin
router.post("/reviews", userController.postUpdateReview);

//update a review
router.get("/reviews/:reviewId", userController.updateReview);

//updating user details
router.get("/update-user/:userId", userController.updateUser);

//deleting an user
router.get("/delete-user/:userId", userController.deleteUser);

//making an employee as admin
router.get("/make-admin-user/:userId", userController.makeAdminUser);

// router.get('/update-user/:userId', userController.updateUser);
//posting user details
router.post("/update-user/:userId", userController.postUser);

module.exports = router;
