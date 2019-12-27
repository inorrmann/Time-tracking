const db = require("../models");
const router = require("express").Router();

// landing page - start
router.get("/", function (req, res) {
    res.render("start");
});

// dashboard from start
router.get("/dashboard", function (req, res) {
    res.render("dashboard")
})

// dashboard after saving an activity
router.get("/dashboard/:date", function (req, res) {
    db.Activity.find({ "date": req.params.date })
        .then(function (dbActivity) {
            res.render("dashboard-populated", {activities: dbActivity, fullDate: dbActivity[0]})
        })
})

// charts page from dashboard
router.get("/charts", function(req, res) {
    db.Activity.find({})
        .then(dbActivity => {
            console.log(dbActivity)
            res.render("charts");
        })
        .catch(err => {
            res.json(err);
        });
});




module.exports = router