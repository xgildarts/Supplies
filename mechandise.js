
const backBtn = document.querySelector(".fa-chevron-left");

backBtn.addEventListener("click", function(e) {
    const result = window.confirm("Are you sure do you want to go back?");
    if(result) {
        window.location.href = "selections.html";
    }
});