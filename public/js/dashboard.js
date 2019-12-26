// dynamically generate times for options in form
document.querySelector("#today").value = moment().format("MMMM Do, YYYY");
document.querySelector("#today").textContent = `${moment().format(" MMMM Do, YYYY")} (today)`;
document.querySelector("#today-1").value = moment().subtract(1, 'days').format("MMMM Do, YYYY");
document.querySelector("#today-1").textContent = moment().subtract(1, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-2").value = moment().subtract(2, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-2").textContent = moment().subtract(2, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-3").value = moment().subtract(3, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-3").textContent = moment().subtract(3, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-4").value = moment().subtract(4, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-4").textContent = moment().subtract(4, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-5").value = moment().subtract(5, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-5").textContent = moment().subtract(5, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-6").value = moment().subtract(6, 'days').format(" MMMM Do, YYYY");
document.querySelector("#today-6").textContent = moment().subtract(6, 'days').format(" MMMM Do, YYYY");

const saveBtn = document.querySelector("#saveBtn")
saveBtn.addEventListener("click", function () {
    event.preventDefault();
    document.querySelector("#calendar").classList.remove("d-none");
    // collect all the values from the dropdown menus
    let date = document.querySelector("#dateSelection").value;
    let activity = document.querySelector("#activity").value;
    let description = document.querySelector("#inputDescription").value;

    // transform the selections for the start and end times
    // start times
    let startHr = document.querySelector("#startHour").value;
    let startMin = document.querySelector("#startMinute").value;
    let startTime = document.querySelector("#startTime").value;

    if (startHr === "1200") {
        startHr = "0";
    }
    let startHour = parseInt(startHr) + parseInt(startTime);
    let startMinute = parseInt(startMin);

    let startSlot = (parseInt(startHr) + parseInt(startMin) + parseInt(startTime)).toString();

    // end times
    let endHr = document.querySelector("#endHour").value;
    let endMin = document.querySelector("#endMinute").value;
    let endTime = document.querySelector("#endTime").value;

    if (endHr === "1200") {
        endHr = "0";
    }
    let endHour = parseInt(endHr) + parseInt(endTime);
    let endMinute = parseInt(endMin);
    
    let endSlot = (parseInt(endHr) + parseInt(endMin) + parseInt(endTime)).toString();

    // total time calculations
    const totalHour = (endHour - startHour) / 100;
    const totalMinute = (endMinute - startMinute) / 20;
    const slot = ((totalHour * 3) + totalMinute).toString();

    console.log(startSlot);
    console.log(endSlot);
    console.log(slot)

    


    document.querySelector("#calendarDate").textContent = `Date: ${date}`;

})
