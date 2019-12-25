const db = require("../models");
const router = require("express").Router();

// landing page - register
router.get("/", function(req, res) {
    res.render("register");
});

// login page
router.get("/login", function(req, res) {
    res.render("login");
});

// dashboard for a specific username
router.get("/dashboard/:username", function (req, res) {
    console.log(`req.params.username: ${req.params.username}`);
    let username = req.params.username;

    db.User.find({ "username": username })
        .then(function (dbUser) {
            console.log(dbUser[0])
            res.render("dashboard", {welcome: dbUser[0]})
        })
})


module.exports = router