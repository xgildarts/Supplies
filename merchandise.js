
const backBtn = document.querySelector(".fa-chevron-left");
const submit_btn = document.querySelector(".submit_btn");

let form = document.querySelector("form");
let name = document.querySelector(".name");
let merchandise_selection = document.querySelector(".merchandise_selection");
let orNumber = document.querySelector(".orNumber");
let date = document.querySelector(".date");
let quantity = document.querySelector(".quantity");
let price = document.querySelector(".price");
let sku = document.querySelector(".sku");
let revenue_channel = document.querySelector(".revenue_channel");
let total = document.querySelector(".total");


document.addEventListener("DOMContentLoaded", function(e) {
    if(sessionStorage.getItem("username") || sessionStorage.getItem("password")) {
            
    } else {
        window.alert("Login first!");
        window.location.href = "index.html";
    }
    getMerchandiseListItems();
    getRevenueChannel();
    merchandiseSelection();
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
        let res = await fetch("https://supplies-office-punp.infinityfreeapp.com/merchandise_api.php", {
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
        let res = await fetch("http://192.168.100.222/Supplies/merchandise_api.php", {
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



form.addEventListener("submit", function(e) {

    e.preventDefault();

    let newDate = date.value.split("-");
    
    newDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
    if(revenue_channel.value == "None") {
        revenue_channel.value = "";
    }

    const payload = {

        request_name: "insert",
        date: newDate,
        sku: sku.value,
        product_name: merchandise_selection.value,
        revenue_channel: revenue_channel.value,
        quantity: quantity.value,
        price: price.value,
        receipt_number: orNumber.value,
        name: name.value

    };

    const confirmation = window.confirm("Do you want to confirm?");

    if(confirmation) {

        submit_btn.textContent = "Sending...";
        submit_btn.disabled = true;
        submit_btn.style.pointerEvents = 'none';
        
        fetch("http://192.168.100.222/Supplies/merchandise_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((response) => response.json())
        .then((val) => {

            window.alert(val); 
            submit_btn.textContent = "Submit";
            submit_btn.disabled = false;
            submit_btn.style.pointerEvents = "auto";

            date.value = "";
            sku.value = "";
            merchandise_selection.value = "";
            revenue_channel.value = ""; 
            quantity.value = "";
            price.value = "";
            orNumber.value = "";;
            name.value = "";
            total.value = "";

        })
        .catch((err) => {
            submit_btn.textContent = "Submit";
            submit_btn.disabled = false;
            submit_btn.style.pointerEvents = "auto";
            console.log(err);

            date.value = "";
            sku.value = "";
            merchandise_selection.value = "";
            revenue_channel.value = ""; 
            quantity.value = "";
            price.value = "";
            orNumber.value = "";;
            name.value = "";
            total.value = "";
        });
    


    } else {

        return;
    }

    

});

function merchandiseSelection() {

    const payload = {
        request_name: "merchandise"
    };

    fetch("http://192.168.100.222/Supplies/merchandise_api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((val) => {

        merchandise_selection.addEventListener("change", function(e) {

            val.forEach((element) => {
                if(merchandise_selection.value == element[1]) {
                    price.value = element[2];
                    sku.value = element[0];
                } 
            });

            if(price.value) {
                total.value = price.value * quantity.value;
            }

        });

    });
    
    
}

quantity.addEventListener("input", function(e) {
    if(price.value) {
        total.value = price.value * quantity.value;
    }
});


quantity.addEventListener("input", function(e) {
    if(quantity.value < 0) {
        quantity.value = 1;
    }
});

