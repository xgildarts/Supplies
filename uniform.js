
const backBtn = document.querySelector(".fa-chevron-left");
const form = document.querySelector("form");

if(backBtn) {
    backBtn.addEventListener("click", function(e) {
        const result = window.confirm('Are you sure do you want to go back?');
        if(result) {
            window.location.href = "selections.html";
        } 
    });
} else {
    console.log("Cannot read the class");
}

//Sending a data to google sheet
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
});