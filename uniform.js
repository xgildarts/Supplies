
const backBtn = document.querySelector(".fa-chevron-left");
const form = document.querySelector("form");
const product_name = document.querySelector(".product_name");
let price = document.querySelector(".price");
let sku = document.querySelector(".sku");
let size = document.querySelector(".size");

document.addEventListener("DOMContentLoaded", (e) => {

    getUniformName();
    getSize();
    autoGeneratePriceAndSKU();

});

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
        let htmlCode = '<option disabled selected>Choose a size</option>';
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
                }
            });
        });

    })
    .catch((error) => console.error(error));

}

