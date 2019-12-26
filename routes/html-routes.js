const db = require("../models");
const router = require("express").Router();

// landing page - start
router.get("/", function (req, res) {
    res.render("start");
});

// dashboard for a specific username
router.get("/dashboard", function (req, res) {
    res.render("dashboard")

})


module.exports = router