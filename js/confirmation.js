
let StringOrderId = window.location.search;

console.log(window.location);

let urlParams = new URLSearchParams(StringOrderId);

let orderId = urlParams.get("id");

console.log(orderId);

const displayOrderId  = document.getElementById("orderId");

displayOrderId.innerText = orderId;

localStorage.clear();


