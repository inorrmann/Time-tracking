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
        type: String,
        required: "Start time is required"
    },
    endTime: {
        type: String,
        required: "End time is required"
    },
    startDisplay: {
        type: String
    },
    endDisplay: {
        type: String
    },
    totalTime: {
        type: String,
        default: 0
    },
    date: {
        type: String
    }

});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;