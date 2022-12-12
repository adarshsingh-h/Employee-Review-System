const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user')
const mongoose = require("mongoose");
require("dotenv").config();

//setting up the templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//DB connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));

//Body-Parser
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("public"));

//redirecting to signIn page
app.get('/', (req, res, next) => {
    res.redirect('/auth/signin');
})

//Endpoints
app.use("/auth", authRoutes);
app.use("/", userRoutes);

//server listening on port 8000
app.listen(8000, () => {
    console.log("Server Running!");
});
