const db = require("../models");
const router = require("express").Router();

// landing page - start
router.get("/", function (req, res) {
    res.render("start");
});

// dashboard
router.get("/dashboard", function (req, res) {
    res.render("dashboard")
})

router.get("/dashboard/:date", function (req, res) {
    console.log(`req.params.date: ${req.params.date}`)
    // let date = req.params.date.replace(/%20/g, " ");
    // console.log(`Date extracted from the params and transformed string: ${date}`);
    db.Activity.find({ "date": req.params.date })
        .then(function (dbActivity) {
            console.log(dbActivity[0])
            // res.render("dashboard-populated", {fullDate: dbActivity[0]})
            res.render("dashboard-populated", {activities: dbActivity, fullDate: dbActivity[0]})
        })
})






module.exports = router