const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        unique: true
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