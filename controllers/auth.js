const User = require("../models/User");
const bcrypt = require("bcrypt");

//get sign up page
exports.getSignUp = (req, res, next) => {
    res.render("signup", {
        title: "Register",
    });
};

//get sign in page
exports.getSignIn = (req, res, next) => {
    res.render("signin", {
        title: "Login",
    });
};

//post sign in page data
exports.postSignIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(400).send("User not found");
    }

    bcrypt
        .compare(password, user.password)
        .then(() => {
            res.redirect(
                "/dashboard?isAdmin=" +
                    `${user.isAdmin}&id=${user._id.toString()}`
            );
        })
        .catch((err) => console.log(err));
};

//post sign in page data
exports.postSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send("All fields are mandatory");
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        const details = new User({
            name,
            email,
            password: hashedPwd,
            isAdmin: false,
            reviewsToBeDone: [],
        });

        await details.save();

        res.redirect("/auth/signin");
    } catch (error) {
        console.log(error);
        res.status(400).send("error");
    }
};
