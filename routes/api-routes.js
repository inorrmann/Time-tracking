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

module.exports = router
