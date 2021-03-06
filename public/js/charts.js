$(document).ready(function () {

    $.ajax("api/activities", {
        type: "GET",
    }).then(function (data) {

        // Global Chart options
        Chart.defaults.global.defaultFontFamily = "Archivo";
        Chart.defaults.global.defaultFontSize = 15;
        Chart.defaults.global.defaultFontColor = "Black";

        // 
        // ******************************** WEEK CHARTS (top left) ********************************
        // 
        // day formats for axis 
        let day1 = moment().subtract(6, 'days').format("ddd, MM/D")
        let day2 = moment().subtract(5, 'days').format("ddd, MM/D")
        let day3 = moment().subtract(4, 'days').format("ddd, MM/D")
        let day4 = moment().subtract(3, 'days').format("ddd, MM/D")
        let day5 = moment().subtract(2, 'days').format("ddd, MM/D")
        let day6 = moment().subtract(1, 'days').format("ddd, MM/D")
        let day7 = moment().format("ddd, MM/D")

        let weekEat = [0, 0, 0, 0, 0, 0, 0];
        let weekLeisure = [0, 0, 0, 0, 0, 0, 0];
        let weekSchool = [0, 0, 0, 0, 0, 0, 0];
        let weekSleep = [0, 0, 0, 0, 0, 0, 0];
        let weekWork = [0, 0, 0, 0, 0, 0, 0];
        let weekOther = [0, 0, 0, 0, 0, 0, 0];

        // format of current week that will match data format
        let longDay = [moment().subtract(6, 'days').format("dddd, MMM Do, YYYY"), moment().subtract(5, 'days').format("dddd, MMM Do, YYYY"), moment().subtract(4, 'days').format("dddd, MMM Do, YYYY"), moment().subtract(3, 'days').format("dddd, MMM Do, YYYY"), moment().subtract(2, 'days').format("dddd, MMM Do, YYYY"), moment().subtract(1, 'days').format("dddd, MMM Do, YYYY"), moment().format("dddd, MMM Do, YYYY")];

        // extract the values of the activities for each day
        data.forEach((activity) => {
            for (i = 0; i < 7; i++) {
                if (activity.date === longDay[i]) {
                    if (activity.activity === "eat") {
                        weekEat[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "leisure") {
                        weekLeisure[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "school") {
                        weekSchool[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "sleep") {
                        weekSleep[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "work") {
                        weekWork[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "other") {
                        weekOther[i] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                }
            }
        });

        // chart for this week's activities
        let weekChart = document.querySelector("#week-charts").getContext("2d");
        let weekDisplay = new Chart(weekChart, {
            type: "line",
            data: {
                labels: [`${day1}`, `${day2}`, `${day3}`, `${day4}`, `${day5}`, `${day6}`, `${day7}`],
                datasets: [{
                    label: "Eat",
                    data: weekEat,
                    borderColor: "#FAE123",
                    backgroundColor: "#FAE123",
                    fill: false
                }, {
                    label: "Leisure",
                    data: weekLeisure,
                    borderColor: "#35B35A",
                    backgroundColor: "#35B35A",
                    fill: false
                }, {
                    label: "School",
                    data: weekSchool,
                    backgroundColor: "#5a32b8",
                    borderColor: "#5a32b8",
                    fill: false
                }, {
                    label: "Sleep",
                    data: weekSleep,
                    backgroundColor: "#2C58B8",
                    borderColor: "#2C58B8",
                    fill: false
                }, {
                    label: "Work",
                    data: weekWork,
                    backgroundColor: "#B31A19",
                    borderColor: "#B31A19",
                    fill: false
                }, {
                    label: "Other",
                    data: weekOther,
                    backgroundColor: "#EB9007",
                    backgroundColor: "#EB9007",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "This Week's Activities",
                    fontFamily: "Raleway",
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        fontColor: "black",
                        fontSize: 16
                    }
                },
                layout: {
                    padding: {
                        left: 5,
                        right: 5
                    }
                },
                tooltips: {
                    enabled: true,
                },
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Date",
                            fontSize: 16
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Hours",
                            fontSize: 16
                        }
                    }]
                }
            }
        });

        // 
        // ******************************** DAY CHARTS (top right) ********************************
        // 
        // populate the dropdown menu with today's date and 6 previous days
        document.querySelector("#today").value = moment().format("dddd, MMM Do, YYYY");
        document.querySelector("#today").textContent = `${moment().format("dddd, MMM Do, YYYY")} (today)`;
        document.querySelector("#today-1").textContent = moment().subtract(1, 'days').format("dddd, MMM Do, YYYY");
        document.querySelector("#today-2").textContent = moment().subtract(2, 'days').format("dddd, MMM Do, YYYY");
        document.querySelector("#today-3").textContent = moment().subtract(3, 'days').format("dddd, MMM Do, YYYY");
        document.querySelector("#today-4").textContent = moment().subtract(4, 'days').format("dddd, MMM Do, YYYY");
        document.querySelector("#today-5").textContent = moment().subtract(5, 'days').format("dddd, MMM Do, YYYY");
        document.querySelector("#today-6").textContent = moment().subtract(6, 'days').format("dddd, MMM Do, YYYY");

        const goBtn = document.querySelector("#goBtn");
        goBtn.addEventListener("click", function () {
            event.preventDefault();

            let dateChart = document.querySelector("#date-chart").value;

            let dayActivity = [0, 0, 0, 0, 0, 0, 24]
            data.forEach((activity) => {
                if (activity.date === dateChart) {
                    if (activity.activity === "eat") {
                        dayActivity[0] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "leisure") {
                        dayActivity[1] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "school") {
                        dayActivity[2] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "sleep") {
                        dayActivity[3] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "work") {
                        dayActivity[4] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                    else if (activity.activity === "other") {
                        dayActivity[5] += ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                        dayActivity[6] -= ((Math.round((parseInt(activity.totalTime) / 3) * 100)) / 100);
                    }
                }
            });


            let dayChart = document.querySelector("#activity-charts").getContext("2d");

            let dayDisplay = new Chart(dayChart, {
                type: "pie",
                data: {
                    labels: ["Eat", "Leisure", "School", "Sleep", "Work", "Other", "None"],
                    datasets: [{
                        data: dayActivity,
                        backgroundColor: ["#FAE123", "#35B35A", "#5a32b8", "#2C58B8", "#B31A19", "#EB9007", "white"],
                        borderWidth: 1,
                        borderColor: ["#FAE123", "#35B35A", "#5a32b8", "#2C58B8", "#B31A19", "#EB9007", "white"],
                        hoverBorderWidth: 1,
                        hoverBorderColor: "black"
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: `Activities for ${dateChart}`,
                        position: "bottom",
                        fontFamily: "Raleway",
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            fontColor: "black",
                            fontSize: 16
                        }
                    },
                    layout: {
                        padding: {
                            left: 5,
                            right: 5
                        }
                    },
                    tooltips: {
                        enabled: true,
                    },
                    maintainAspectRatio: true,
                }
            });
        });
    })

    // redirect buttons at the bottom of the page
    const homeBtn = document.querySelector("#home-btn");
    homeBtn.addEventListener("click", function () {
        location.href = "/"
    })

    const dashboardBtn = document.querySelector("#dashboard-btn");
    dashboardBtn.addEventListener("click", function () {
        location.href = "/dashboard"
    })

})
