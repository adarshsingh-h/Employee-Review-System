const { default: mongoose } = require("mongoose");
const Review = require("../models/Review");
const User = require("../models/User");

//rendering dashboard page
exports.getDashboard = async (req, res) => {
    const isAdmin = req.query.isAdmin;

    if (isAdmin === "true") {
        const employees = await User.find({});

        res.render("dashboard", {
            isAdmin: isAdmin,
            employees,
        });
    } else {
        const id = req.query.id;

        const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });

        res.render("dashboard", {
            isAdmin: isAdmin,
            reviews: user.reviewsToBeDone,
            id,
            user,
        });
    }
};

//assigning reviewer
exports.assignReviews = async (req, res) => {
    const employees = await User.find({});
    res.render("assignReviews", {
        isAdmin: "true",
        employees,
    });
};

//posting assign reviews data
exports.postAssignReviews = async (req, res) => {
    const { reviewer, reviewee } = req.body;
    const user = await User.findOne({ name: reviewer });
    let reviewerArray = [...user.reviewsToBeDone, reviewee];

    User.updateOne(
        { name: reviewer },
        { reviewsToBeDone: reviewerArray },
        (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("User updated successfully");
            }
        }
    );
    res.send("Done");
};

//get review
exports.getReview = async (req, res) => {
    res.render("giveReview", {
        name: req.query.reviewee,
        isAdmin: "false",
        id: req.query.id,
    });
};

//post reviews
exports.postReview = async (req, res) => {
    const { review, name, id } = req.body;

    const reviewer = await User.findOne({ _id: mongoose.Types.ObjectId(id) });

    const newReview = new Review({
        doneBy: reviewer.name,
        doneFor: name,
        review,
    });

    await newReview.save();

    res.redirect(`/dashboard?isAdmin=${false}&id=${id}`);
};

//getting all review's
exports.getReviews = async (req, res) => {
    const reviews = await Review.find({});
    res.render("getReviews", {
        isAdmin: "true",
        reviews: reviews,
    });
};

//update review of an employee
exports.updateReview = async (req, res) => {
    const id = req.params.reviewId;
    const review = await Review.findOne({ _id: mongoose.Types.ObjectId(id) });
    res.render("updateReview", {
        isAdmin: "true",
        review,
    });
};

//updating the review
exports.postUpdateReview = async (req, res) => {
    const { review, id } = req.body;
    console.log(req.body);

    Review.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { review: review },
        (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("User updated successfully");
            }
        }
    );
    res.redirect("/reviews");
};

//delete an user
exports.deleteUser = async (req, res) => {
    const id = req.params.userId;
    await User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    res.redirect("/dashboard?isAdmin=true");
};

//making an user as an admin
exports.makeAdminUser = async (req, res) => {
    const id = req.params.userId;
    await User.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { isAdmin: true }
    );
    res.redirect("/dashboard?isAdmin=true");
};

//updating an user
exports.updateUser = async (req, res) => {
    const id = req.params.userId;
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
    res.render("updateUser", {
        isAdmin: "true",
        user,
    });
};

//post updated information of the user
exports.postUser = async (req, res) => {
    const id = req.params.userId;
    const { name, email } = req.body;
    console.log(id, name, email);
    await User.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { name: name, email: email } }
    );
    res.redirect("/dashboard?isAdmin=true");
};
