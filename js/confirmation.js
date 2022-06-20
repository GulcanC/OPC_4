


function validation(){
    const getOrderId = document.getElementById("orderId");
    getOrderId.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
   // localStorage.clear();
}

validation();