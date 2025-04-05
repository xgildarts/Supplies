
const backBtn = document.querySelector(".fa-chevron-left");
const form = document.querySelector("form");
const submit_btn = document.querySelector(".submit_btn");

let name = document.querySelector(".name");
let product_name = document.querySelector(".product_name");
let receipt_number = document.querySelector(".receipt_number");
let price = document.querySelector(".price");
let sku = document.querySelector(".sku");
let size = document.querySelector(".size");
let quantity = document.querySelector(".quantity");
let date = document.querySelector(".date");
let total = document.querySelector(".total");
let revenue_channel = document.querySelector(".revenue_channel");


document.addEventListener("DOMContentLoaded", (e) => {
    if(sessionStorage.getItem("username") || sessionStorage.getItem("password")) {
            
    } else {
        window.alert("Login first!");
        window.location.href = "index.html";
    }
    getUniformName();
    getSize();
    revenueChannel();
    autoGeneratePriceAndSKU();
    setTotal();
    validation();

});

//Set back button
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

//Set total
function setTotal() {
    product_name.addEventListener("change", (e) => {
        if(price.value) {
            total.value = price.value * quantity.value;   
        }
    });
    size.addEventListener("change", (e) => {
        if(price.value) {
            total.value = price.value * quantity.value;
        }
    });
    quantity.addEventListener("input", function(e) {
        if(price.value) {
            total.value = price.value * quantity.value;
        }
    });
}

//Validation
function validation() {
    quantity.addEventListener("input", function(e) {
        if(quantity.value < 0) {
            quantity.value = 1;
        }
    });
}


//Sending a data to google sheet
form.addEventListener("submit", function(e) {

    e.preventDefault();

    let product_n = "";
    let newDate = date.value.split("-");
    newDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`;

    if(size.value == "NONE") {
        product_n = product_name.value
    } else {
        product_n = `${product_name.value} ${size.value}`
    }

    if(revenue_channel.value == "None") {
        revenue_channel.value = "";
    }

    
    const payload = {

        request_name: "insert",
        date: newDate,
        sku: sku.value,
        product_name: product_n,
        revenue_channel: revenue_channel.value,
        quantity: quantity.value,
        price: price.value,
        receipt_number: receipt_number.value,
        name: name.value

    };

    const confirmation = window.confirm("Do you want to confirm?");

    if(confirmation) {

        submit_btn.textContent = "Sending...";
        submit_btn.disabled = true;
        submit_btn.style.pointerEvents = "none";

        fetch("http://localhost/Supplies/uniform_api.php", {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then((response) => response.json())
        .then((val) => {
            window.alert(val[0]);
            submit_btn.textContent = "Submit";
            submit_btn.disabled = false;
            submit_btn.style.pointerEvents = "auto";

            date.value = "";
            sku.value = "";
            product_name.value = "";
            size.value = "";
            revenue_channel.value = ""; 
            quantity.value = "";
            price.value = "";
            receipt_number.value = "";;
            name.value = "";
            total.value = "";
        })
        .catch((err) => {
            console.error(err);
            submit_btn.textContent = "Submit";
            submit_btn.disabled = false;
            submit_btn.style.pointerEvents = "auto";

            date.value = "";
            sku.value = "";
            product_name.value = "";
            size.value = "";
            revenue_channel.value = ""; 
            quantity.value = "";
            price.value = "";
            receipt_number.value = "";;
            name.value = "";
            total.value = "";
        });
    
    } else {
        return;
    }

    
});



//Get all the uniform name from googlesheet
function getUniformName() {

    fetch("http://localhost/Supplies/uniform_api.php", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({request_name: "uniforms"})
    })
    .then((response) => response.json())
    .then((val) => {
        let htmlCode = '<option value="" disabled selected>Choose a product</option>';
        val.forEach(element => {
            htmlCode += `<option value='${element[0]}'>${element[0]}</option>`;
        });
        product_name.innerHTML = htmlCode;

    })
    .catch((err) => console.error(err));

}

//Get all the sizes from googlesheet
function getSize() {

    fetch("http://localhost/Supplies/uniform_api.php", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({request_name: "sizes"})
    })
    .then((response) => response.json())
    .then((val) => {
        let htmlCode = '<option value="" disabled selected>Choose a size</option>';
        val.forEach(element => {
            htmlCode += `<option value='${element[0]}'>${element[0]}</option>`;
        });
        size.innerHTML = htmlCode;

    })
    .catch((err) => console.error(err));

}

//Auto generate
function autoGeneratePriceAndSKU() {
    
    fetch("http://localhost/Supplies/uniform_api.php", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({request_name: "comparing"})
    })
    .then((res) => res.json())
    .then((val) => {

        size.addEventListener("change", function(e) {
            sku.value = 0;
            price.value = 0;
            val.forEach(function(element) {
                if(element[1] == `${product_name.value} ${size.value}`) {
                    sku.value = element[0];
                    price.value = element[2];
                } else if(size.value == 'NONE') {
                    if(element[1] == `${product_name.value}`) {
                        sku.value = element[0];
                        price.value = element[2];
                    }
                }
            });
        });

        product_name.addEventListener("change", function(e) {
            sku.value = 0;
            price.value = 0;
            val.forEach(function(element) {
                if(element[1] == `${product_name.value} ${size.value}`) {
                    sku.value = element[0];
                    price.value = element[2];
                } else if(size.value == 'NONE') {
                    if(element[1] == `${product_name.value}`) {
                        sku.value = element[0];
                        price.value = element[2];
                    }
                }
            });
        });

    })
    .catch((error) => console.error(error));

}


//Get all revenue channel
function revenueChannel() {

    fetch("http://localhost/Supplies/uniform_api.php", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({request_name: "revenue_channel"})
    })
    .then((response) => response.json())
    .then((val) => {
        let htmlCode = '<option value="" selected disabled>Choose revenue channel</option>';
        val.forEach(element => {
            htmlCode += `<option value='${element[0]}'>${element[0]}</option>`;
        });
        revenue_channel.innerHTML = htmlCode;

    })
    .catch((err) => console.error(err));


}


