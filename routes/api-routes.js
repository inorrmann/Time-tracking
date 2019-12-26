const router = require("express").Router();
const db = require("../models");


router.post("/users", ({body}, res) => {
    const user = new db.User(body);

    db.User.create(user)
        .then(dbUser => {
            // console.log(dbUser);
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});


router.get("/users", ({body}, res) => {
    console.log(body)
    
    db.User.find({ "username": username })
        .then(function (dbUser) {
            console.log(dbUser[0])
            res.render("dashboard", {welcome: dbUser[0]})
        })


});

router.get("/dashboard/:username", function (req, res) {
    console.log(`req.params.username: ${req.params.username}`);
    let username = req.params.username;

    
})





module.exports = router
