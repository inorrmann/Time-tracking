const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const hbs = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("hbs", hbs({ defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
app.use("/api/", apiRoutes);
app.use("/", htmlRoutes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/timetracker", 
    { useNewUrlParser: true}
    );


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

