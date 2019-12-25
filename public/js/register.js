// 
// ****************************** REGISTER PAGE ******************************
// 

// When register, post data and redirect to dashboard
const registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", function () {
    event.preventDefault();
    console.log("registered!")

    var firstName = document.querySelector("#register-form [name=firstName]").value.trim();
    var lastName = document.querySelector("#register-form [name=lastName]").value.trim();
    var username = document.querySelector("#register-form [name=username]").value.trim();
    var email = document.querySelector("#register-form [name=email]").value.trim();
    var password = document.querySelector("#register-form [name=password]").value.trim();

    let newUser = { firstName: firstName, lastName: lastName, username: username, email: email, password: password }

    $.ajax("/api/users", {
        type: "POST",
        data: newUser
    }).then(function () {
        location.href = `/dashboard/${newUser.username}`
    })
})



// 
// ****************************** LOGIN PAGE ******************************
// 


// 
// ****************************** DASHBOARD PAGE ******************************
// 



// 
// ****************************** CHARTS PAGE ******************************
// 












// grid-row: slot0000 / span 10;


