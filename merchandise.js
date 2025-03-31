
const backBtn = document.querySelector(".fa-chevron-left");
const submit_btn = document.querySelector(".submit_btn");

let name = document.querySelector(".name");
let merchandise_selection = document.querySelector(".merchandise_selection");
let orNumber = document.querySelector(".orNumber");
let date = document.querySelector(".date");
let quantity = document.querySelector(".quantity");
let revenue_channel = document.querySelector(".revenue_channel");


document.addEventListener("DOMContentLoaded", function(e) {
    getMerchandiseListItems();
    getRevenueChannel();
});

backBtn.addEventListener("click", function(e) {
    const result = window.confirm("Are you sure do you want to go back?");
    if(result) {
        window.location.href = "selections.html";
    }
});

async function getMerchandiseListItems() {

    const payload = {
        request_name: "merchandise"
    };
    
    try {
        let res = await fetch("http://localhost/Supplies/merchandise_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if(res.ok) {
            let data = await res.json();
            let html = '<option disabled selected value="">Select an item</option>';
            data.forEach(function(element) {
                html += `<option value='${element[1]}'>${element[1]}</option>`;
            });
            merchandise_selection.innerHTML = html;
        } else {
            console.log("Error: " + res.status);
        }
    } catch(error) {
        console.log("Error: " + error);
    }

}


async function getRevenueChannel() {

    const payload = {
        request_name: "revenue_channel"
    };
    
    try {
        let res = await fetch("http://localhost/Supplies/merchandise_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if(res.ok) {
            let data = await res.json();
            let html = '<option disabled selected value="">Select a channel</option>';
            data.forEach(function(element) {
                html += `<option value='${element[0]}'>${element[0]}</option>`;
            });
            revenue_channel.innerHTML = html;
        }
    } catch(error) {
        console.log("Error: " + error);
    }

}

submit_btn.addEventListener("click", function(e) {
    e.preventDefault();

    

});