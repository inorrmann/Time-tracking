const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Pkease enter a valid email address"]
    },
    password: {
        type: String,
        trim: true,
        validate: [({length}) => length >=6, "Password should be at least 6 characters long"]
    },
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: "Activity"
        }
    ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;