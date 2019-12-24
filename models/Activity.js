const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    activity: {
        type: String,
        required: "Activity is required"
    },
    description: {
        type: String,
        trim: true
    },
    startTime: {
        type: Date,
        required: "Start time is required"
    },
    endTime: {
        type: Date,
        required: "End time is required"
    },
    totalTime: {
        type: Number
    }
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Book;