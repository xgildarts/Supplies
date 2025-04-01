
const uniform_btn = document.querySelector(".uniform_btn");
const merchandise_btn = document.querySelector(".merchandise_btn");
const back_btn = document.querySelector(".fa-right-from-bracket");

document.addEventListener("DOMContentLoaded", function(e) {
    if(sessionStorage.getItem("username") || sessionStorage.getItem("password")) {
        
    } else {
        window.alert("Login first!");
        window.location.href = "index.html";
    }
})


if(uniform_btn) {
    uniform_btn.addEventListener("click", (e) => {
        window.location.href = "uniform.html";
    });
} else {
    console.log("Class not found!");
}

if(merchandise_btn) {
    merchandise_btn.addEventListener("click", (e) => {
        window.location.href = "merchandise.html";
    });
} else {
    console.log("Class not found!");
}

if(back_btn) {
    back_btn.addEventListener("click", (e) => {
        const result = window.confirm("do you want to logout?");
        if(result) {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("password");
            window.location.href = "index.html";
        } 
    });    
} else {
    console.log("Class not found!");
}