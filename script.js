let divs1 = document.querySelectorAll(".block1-inside div");
let divs2 = document.querySelectorAll(".block2 div");
let divs3 = document.querySelectorAll(".block3 div")
let div1Bottom = document.querySelector(".div1");
let div2Bottom = document.querySelector(".div2");
let block3 = document.querySelector(".block3");
// let sellValue = document.querySelector(".sell-value");
let buyValue = document.querySelector(".buy-value");
let sellValue = document.querySelector(".sell-value");

function setupSelection(parentSelector) {
    let divs = document.querySelectorAll(parentSelector + " div");

    divs.forEach(div => {

        div.style.cursor = "pointer";

        div.addEventListener("click", () => {

            div.parentElement.querySelectorAll("div").forEach(d => {
                d.style.backgroundColor = "";
                d.classList.remove("active");
            });

            div.style.backgroundColor = "#833AE0";
            div.classList.add("active");

            if (document.activeElement === input2) {
                input2.dispatchEvent(new Event("input"));
            } else {
                input1.dispatchEvent(new Event("input"));
            }

        });

    });
}
setupSelection(".block1-inside");
setupSelection(".block2");
setupSelection(".block3");

let block1 = document.querySelector(".block1-inside");


for (let div of divs1) {
    div.addEventListener("mouseover", () => {
        div.style.cursor = "pointer";
    })
}
let bottom = document.querySelectorAll(".block1-bottom");
let inputs = document.querySelectorAll(".inputs");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
inputs.forEach(input => {
    input.addEventListener("input", () => {


        if (input.value < 0) {
            input.value = 0;
        }
        if (input.value > 10000) {
            input.value = 10000;
        }
        if ((input.value.length > 1 && input.value[0] == "0") && (input.value[1] != ".")) {
            input.value = input.value.slice(1);
        }



    });
});
input1.addEventListener("input", () => {
    let from_currency = document.querySelector(".block1-inside .active").textContent;
    let to_currency = document.querySelector(".block2 .active").textContent; //secilen valyuta
    input1.value = input1.value.replace(/,/g, ".");
    input1.value = input1.value.replace(/[^0-9.]/g, "");


    if (input1.value[0] == ".") {
        input1.value = "";
    }
    if (input1.value.includes(".")) {
        let parts = input1.value.split(".");

        if (parts.length > 2) {
            input1.value = parts[0] + "." + parts.slice(1).join("");
        }
        let parts2 = input1.value.split(".");

        if (parts2[1] && parts2[1].length > 4) {
            parts2[1] = parts2[1].slice(0, 4);
            input1.value = parts2.join(".");
        }
        if (parts2[1] == "0000") {
            input1.value = parts2[0];
        }
    }
    if (navigator.onLine) {
        const API_URL = "https://api.exchangerate.host/convert";
        let amount = parseFloat(input1.value) || 0;
        fetch(`${API_URL}?from=${from_currency}&to=${to_currency}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.result) {
                    console.error('Invalid exchange API response:', data);
                    return;
                }

                localStorage.setItem(
                    `${from_currency}_${to_currency}`,
                    JSON.stringify(data)
                );

                input2.value = data.result.toFixed(4);
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "ABC")) {
                    sellValue.innerHTML = (input2.value * 1.01).toFixed(4);
                    buyValue.innerHTML = (input2.value * 0.995).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "NEW")) {
                    sellValue.innerHTML = (input2.value * 1.02).toFixed(4);
                    buyValue.innerHTML = (input2.value * 0.99).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "AME")) {
                    sellValue.innerHTML = (input2.value * 1.015).toFixed(4);
                    buyValue.innerHTML = (input2.value * 0.985).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "RED")) {
                    sellValue.innerHTML = (input2.value * 1.005).toFixed(4);
                    buyValue.innerHTML = (input2.value * 0.995).toFixed(4);
                }


            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    }
    else {
        //offline olanda localStorage-dan deyerleri gotururuk
        let cachedData = JSON.parse(localStorage.getItem(from_currency));
        if (cachedData) {
            input2.value = (input1.value * cachedData.rates[to_currency]).toFixed(4);
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "ABC")) {
                sellValue.innerHTML = (input2.value * 1.01).toFixed(4);
                buyValue.innerHTML = (input2.value * 0.995).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "NEW")) {
                sellValue.innerHTML = (input2.value * 1.02).toFixed(4);
                buyValue.innerHTML = (input2.value * 0.99).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "AME")) {
                sellValue.innerHTML = (input2.value * 1.015).toFixed(4);
                buyValue.innerHTML = (input2.value * 0.985).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "RED")) {
                sellValue.innerHTML = (input2.value * 1.005).toFixed(4);
                buyValue.innerHTML = (input2.value * 0.995).toFixed(4);
            }

        }
        else {
            input2.value = "Bu valyuta offline yadda saxlanmayib";
        }
    }
});

input2.addEventListener("input", () => {
    let from_currency = document.querySelector(".block2 .active").textContent;
    let to_currency = document.querySelector(".block1-inside .active").textContent; //secilen valyuta
    input2.value = input2.value.replace(",", ".");
    input2.value = input2.value.replace(/[^0-9.,]/g, "");
    if (input2.value[0] == ".") {
        input2.value = "";
    }
    if (input2.value.includes(".")) {
        let parts = input2.value.split(".");

        if (parts.length > 2) {
            input2.value = parts[0] + "." + parts.slice(1).join("");
        }
        let parts2 = input2.value.split(".");

        if (parts2[1] && parts2[1].length > 4) {
            parts2[1] = parts2[1].slice(0, 4);
            input2.value = parts2.join(".");
        }
        if (parts2[1] == "0000") {
            input2.value = parts2[0];
        }
    }
    if (navigator.onLine) {
        const API_URL = "https://api.exchangerate.host/convert";
        const amount = parseFloat(input2.value) || 0;
        fetch(`${API_URL}?from=${from_currency}&to=${to_currency}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.result) {
                    console.error('Invalid exchange API response:', data);
                    return;
                }
                input1.value = data.result.toFixed(4);
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "ABC")) {
                    sellValue.innerHTML = (input1.value * 1.01).toFixed(4);
                    buyValue.innerHTML = (input1.value * 0.995).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "NEW")) {
                    sellValue.innerHTML = (input1.value * 1.02).toFixed(4);
                    buyValue.innerHTML = (input1.value * 0.99).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "AME")) {
                    sellValue.innerHTML = (input1.value * 1.015).toFixed(4);
                    buyValue.innerHTML = (input1.value * 0.985).toFixed(4);
                }
                if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "RED")) {
                    sellValue.innerHTML = (input1.value * 1.005).toFixed(4);
                    buyValue.innerHTML = (input1.value * 0.995).toFixed(4);
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    }
    else {
        //offline olanda localStorage-dan deyerleri gotururuk
        let cachedData = JSON.parse(localStorage.getItem(from_currency));
        if (cachedData) {
            input1.value =
                (input2.value * cachedData.rates[to_currency]).toFixed(4);
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "ABC")) {
                sellValue.innerHTML = (input1.value * 1.01).toFixed(4);
                buyValue.innerHTML = (input1.value * 0.995).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "NEW")) {
                sellValue.innerHTML = (input1.value * 1.02).toFixed(4);
                buyValue.innerHTML = (input1.value * 0.99).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "AME")) {
                sellValue.innerHTML = (input1.value * 1.015).toFixed(4);
                buyValue.innerHTML = (input1.value * 0.985).toFixed(4);
            }
            if ((document.querySelector(".block3 .active") && document.querySelector(".block3 .active").textContent == "RED")) {
                sellValue.innerHTML = (input1.value * 1.005).toFixed(4);
                buyValue.innerHTML = (input1.value * 0.995).toFixed(4);
            }
        }
        else {
            input1.value = "Bu valyuta offline yadda saxlanmayib";
        }
    }
});
function checkInternet() {
    const message = document.getElementById("offlineMessage");

    if (navigator.onLine) {
        message.style.display = "none";
    } else {
        message.style.display = "inline-block";
    }
}
window.addEventListener("online", checkInternet);
window.addEventListener("offline", checkInternet);