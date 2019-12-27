// When register, post data and redirect to dashboard
const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", function () {
    console.log("start clicked!")
    location.href = "/dashboard"

})