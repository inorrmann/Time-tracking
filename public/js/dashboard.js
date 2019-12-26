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
    // collect all the values from the dropdown menus
    let date = document.querySelector("#dateSelection").value;
    let activity = document.querySelector("#activity").value;
    let description = document.querySelector("#inputDescription").value;

    // transform the selections for the start and end times
    let startHr = document.querySelector("#startHour").value;
    let startMin = document.querySelector("#startMinute").value;
    let startTime = document.querySelector("#startTime").value;

    if (startHr === "1200") {
        startHr = "0";
    }
    let st = parseInt(startHr) + parseInt(startMin) + parseInt(startTime)
    let start = st.toString();



    console.log(start);

})
