
const uniform_btn = document.querySelector(".uniform_btn");
const merchandise_btn = document.querySelector(".merchandise_btn");
const back_btn = document.querySelector(".fa-right-from-bracket");


uniform_btn.addEventListener("click", (e) => {
    window.location.href = "uniform.html";
});

merchandise_btn.addEventListener("click", (e) => {
    window.location.href = "merchandise.html";
});

back_btn.addEventListener("click", (e) => {
    window.location.href = "index.html";
});
