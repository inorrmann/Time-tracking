// dynamically generate times for options in form
document.querySelector("#today").value = moment().format("dddd, MMM Do, YYYY");
document.querySelector("#today").textContent = `${moment().format("dddd, MMM Do, YYYY")} (today)`;
document.querySelector("#today-1").value = moment().subtract(1, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-1").textContent = moment().subtract(1, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-2").value = moment().subtract(2, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-2").textContent = moment().subtract(2, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-3").value = moment().subtract(3, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-3").textContent = moment().subtract(3, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-4").value = moment().subtract(4, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-4").textContent = moment().subtract(4, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-5").value = moment().subtract(5, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-5").textContent = moment().subtract(5, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-6").value = moment().subtract(6, 'days').format("dddd, MMM Do, YYYY");
document.querySelector("#today-6").textContent = moment().subtract(6, 'days').format("dddd, MMM Do, YYYY");

const saveBtn = document.querySelector("#saveBtn")
saveBtn.addEventListener("click", function () {
    event.preventDefault();
    // collect all the values from the dropdown menus
    let date = document.querySelector("#dateSelection").value;
    let activity = document.querySelector("#activity").value;
    let description = document.querySelector("#inputDescription").value;

    // transform the selections for the start and end times
    // start times
    let startHr = document.querySelector("#startHour").value;
    let startMin = document.querySelector("#startMinute").value;
    let startTime = document.querySelector("#startTime").value;

    // change the start hour to display format
    let startDisplay;
    if (startHr === "100" || startHr === "200" || startHr === "300" || startHr === "400" || startHr === "500" || startHr === "600" || startHr === "700" || startHr === "800" || startHr === "900") {
        startDisplay = startHr.slice(0, 1);
    }
    else if (startHr === "1000" || startHr === "1100") {
        startDisplay = startHr.slice(0, 2)
    }
    else if (startHr === "1200") {
        startHr = "0";
        startDisplay = startHr.slice(0, 2);
    }

    // change am/pm to display format
    let startAmPm;
    if (startTime === "0000") {
        startAmPm = "AM";
    }
    else if (startTime === "1200") {
        startAmPm = "PM";
    }

    startDisplay += `:${startMin} ${startAmPm}`

    let startHour = parseInt(startHr) + parseInt(startTime);
    let startMinute = parseInt(startMin);

    let startSlot = (parseInt(startHr) + parseInt(startMin) + parseInt(startTime)).toString();


    // end times
    let endHr = document.querySelector("#endHour").value;
    let endMin = document.querySelector("#endMinute").value;
    let endTime = document.querySelector("#endTime").value;

    // change the hour to display format
    let endDisplay;
    if (endHr === "100" || endHr === "200" || endHr === "300" || endHr === "400" || endHr === "500" || endHr === "600" || endHr === "700" || endHr === "800" || endHr === "900") {
        endDisplay = endHr.slice(0, 1);
    }
    else if (endHr === "1000" || endHr === "1100") {
        endDisplay = endHr.slice(0, 2)
    }
    else if (endHr === "1200") {
        endHr = "0";
        endDisplay = endHr.slice(0, 2);
    }

    // change am/pm to display format
    let endAmPm;
    if (endTime === "0000") {
        endAmPm = "AM";
    }
    else if (endTime === "1200") {
        endAmPm = "PM";
    }

    endDisplay += `:${endMin} ${endAmPm}`
    let endHour = parseInt(endHr) + parseInt(endTime);
    let endMinute = parseInt(endMin);

    let endSlot = (parseInt(endHr) + parseInt(endMin) + parseInt(endTime)).toString();

    // total time calculations
    const totalHour = (endHour - startHour) / 100;
    const totalMinute = (endMinute - startMinute) / 20;
    const slot = ((totalHour * 3) + totalMinute);
    const slotString = ((totalHour * 3) + totalMinute).toString();

    // object with all the activity information to be posted to database
    let newActivity = { activity: activity, description: description, startTime: startSlot, endTime: endSlot, startDisplay: startDisplay, endDisplay: endDisplay, totalTime: slotString, date: date }

    // Form input warnings
    if (activity === "0") {
        document.querySelector("#warningTitle").textContent = "Activity error";
        document.querySelector("#warningMessage").textContent = "Please select an activity";
        $("#modalWarning").modal();
    }
    else if (startHr === "none" || startMin === "none" || endHr === "none" || endMin === "none") {
        document.querySelector("#warningTitle").textContent = "Time error";
        document.querySelector("#warningMessage").textContent = "Please select a Start Time and an End Time";
        $("#modalWarning").modal();
    }
    else if (slot < 1) {
        document.querySelector("#warningTitle").textContent = "Time selected error";
        document.querySelector("#warningMessage").textContent = "Please make sure your Start Time is earlier than your End Time";
        $("#modalWarning").modal();
    }
    // if no errors, ajax calls
    else {
        $.ajax("/api/activities", {
            type: "POST",
            data: newActivity
        })
            .then(function () {
                console.log(newActivity.date);
                location.href = `/dashboard/${newActivity.date}`;
            })
    }
})

// initialize popovers
$(function () {
    $('[data-toggle="popover"]').popover()
})

// $(".popover-dismiss").popover({
//     trigger: "focus"
//   })
