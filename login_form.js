

const form = document.querySelector(".login_form");
const eye_slash = document.querySelector(".fa-eye-slash");

eye_slash.addEventListener("click", () => {
    if(eye_slash.classList[2] == "fa-eye") {
        eye_slash.classList.remove("fa-eye");
        document.querySelector(".password").type = "password";
    } else {
        eye_slash.classList.add("fa-eye");
        document.querySelector(".password").type = "text";
    }
});

form.addEventListener("submit", (e) => {

    e.preventDefault();
    const remember = document.querySelector(".remember_me_checkbox");
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");
    
    if(remember.checked) {
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        localStorage.setItem("remember", "true");
    } else {
        localStorage.setItem("remember", "false");
    }

    if(!remember.checked) {
        email.value = "";
        password.value = "";
    }


    fetch("http://192.168.100.222/Supplies/login_api.php")
    .then((res) => res.json())
    .then((val) => {
        if(email.value == val[0] && password.value == val[1]) {

            const modal = document.querySelector(".modal");
            let checkIcon = document.querySelector("#check_icon");
            let login_status_text = document.querySelector(".login_status_text");
            let doneBtn = document.querySelector(".done_btn");

            login_status_text.textContent = "Successfully Login!";
            
            if(checkIcon.classList[2] == "fa-xmark") {
                checkIcon.classList.remove("fa-xmark");
                checkIcon.classList.add("fa-check");
            } 

            checkIcon.style.color = "#16e038";
            modal.style.display = "flex";

            doneBtn.addEventListener("click", () => {
                sessionStorage.setItem("username", val[0]);
                sessionStorage.setItem("password", val[1]);
                modal.style.display = "none";
                window.location.href = "selections.html";
            });

            

        } else {

            const modal = document.querySelector(".modal");
            let checkIcon = document.querySelector("#check_icon")
            let login_status_text = document.querySelector(".login_status_text");
            let doneBtn = document.querySelector(".done_btn");

            login_status_text.textContent = "Error Login";

            if(checkIcon.classList[2] == "fa-check") {
                checkIcon.classList.remove("fa-check");
                checkIcon.classList.add("fa-xmark");
            } 

            checkIcon.style.color = "red";
            modal.style.display = "flex";

            doneBtn.addEventListener("click", () => {
                modal.style.display = "none";
                

            });

        }
    })
    .catch((error) => window.alert(error));

});

document.addEventListener("DOMContentLoaded", (e) => {
    if(localStorage.getItem("remember") == "true") {
        const email = document.querySelector(".email");
        const password = document.querySelector(".password");
        email.value = localStorage.getItem("email");
        password.value = localStorage.getItem("password");
        document.querySelector(".remember_me_checkbox").checked = true;
    }
});



