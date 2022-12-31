////////////////////////////////

let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);

if (productLocalStorage) {
  productLocalStorage.forEach(function (product, index) {
    fetch(`https://p5-back.onrender.com/api/products/${product.productId}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })

      .then(function (products) {
        // Create "article" element

        let article = document.createElement("article");
        article.setAttribute("data-id", product.productId);
        article.setAttribute("class", "cart__item");
        document.getElementById("cart__items").appendChild(article);
        // You can use this instead of "setAttribute" =>  article.className = "cart__item";

        // Create first "div" element for imageCreate inside "article"
        let imageDiv = document.createElement("div");
        article.appendChild(imageDiv);
        imageDiv.setAttribute("class", "cart__item__img");

        // Create "img" element
        let image = document.createElement("img");
        imageDiv.appendChild(image);
        image.setAttribute("src", products.imageUrl);
        image.setAttribute("alt", products.altTxt);

        // Create second "div" element inside "article"
        let divItem = document.createElement("div");
        article.appendChild(divItem);
        divItem.setAttribute("class", "cart__item__content");

        // Create fisrt "div" element for h2, p, p inside "divitem"
        let divDescription = document.createElement("div");
        divItem.appendChild(divDescription);
        divDescription.setAttribute("class", "cart__item__content__titlePrice");

        // Create h2 element for name of the product
        let title = document.createElement("h2");
        divDescription.appendChild(title);
        title.innerText = products.name;

        // Create p element for color of the product
        let color = document.createElement("p");
        divDescription.appendChild(color);
        color.innerText = product.productColor;

        // Create p element for price of the product
        let price = document.createElement("p");
        divDescription.appendChild(price);
        price.innerText = products.price + " €";

        // Create second "div" element inside divItem
        let divSettings = document.createElement("div");
        divItem.appendChild(divSettings);
        divSettings.setAttribute("class", "cart__item__content__settings");

        // Create first "div" element inside divSettings
        let divQuantity = document.createElement("div");
        divSettings.appendChild(divQuantity);
        divQuantity.setAttribute(
          "class",
          "cart__item__content__settings__quantity"
        );

        // Create "p" element inside divQuantity
        let quantityEl = document.createElement("p");
        divQuantity.appendChild(quantityEl);
        quantityEl.innerText = "Quantité : ";

        // Create "input" element inside divQuantity
        let productQuantity = document.createElement("input");
        divQuantity.appendChild(productQuantity);
        productQuantity.value = product.productQuantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Create second "div" element inside divSettings
        let divDelete = document.createElement("div");
        divSettings.appendChild(divDelete);
        divDelete.setAttribute(
          "class",
          "cart__item__content__settings__delete"
        );

        // Create second "p" element inside divDelete
        let pDelete = document.createElement("p");
        divDelete.appendChild(pDelete);
        pDelete.setAttribute("class", "deleteItem");
        pDelete.innerText = "Supprimer";

        pDelete.addEventListener("click", function () {
          productLocalStorage.splice(index, 1);

          // send the new data to the localStorage

          localStorage.setItem("product", JSON.stringify(productLocalStorage));

          console.log(productLocalStorage);

          // message after deleted item and refresh the page

          alert("⚠️ The selected product was deleted from your cart!");

          window.location.reload();
        });

        // FUNCTION CHANGE QUANTITY

        function changeQuantity() {
          // See each click input

          // let changeQuantity = document.getElementsByClassName("itemQuantity");

          let changeQuantity = document.querySelectorAll(".itemQuantity");
          console.log(changeQuantity);

          for (let i = 0; i < changeQuantity.length; i++) {
            changeQuantity[i].addEventListener("change", (event) => {
              // event.preventDefault();

              event.stopPropagation();

              // Choose un product according to its color and id

              let updatedQuantity = Number(productQuantity.value);

              if (updatedQuantity <= 0) {
                alert("⚠️ You can NOT enter 0 and negatif values!");
                window.location.reload();
              } else if (updatedQuantity > 100) {
                alert("⚠️ You can NOT enter a value greater than 100!");
                window.location.reload();
              } else if (updatedQuantity >= 1 && updatedQuantity <= 100) {
                var findProduct = productLocalStorage.find(
                  (el) => el.productId == productLocalStorage[i].productId
                );

                findProduct.productQuantity = changeQuantity[i].valueAsNumber;

                productLocalStorage[i].productQuantity =
                  findProduct.productQuantity;

                localStorage.setItem(
                  "product",
                  JSON.stringify(productLocalStorage)
                );
              }

              window.location.reload();
            });
          }
        }

        changeQuantity();

        // FUNCTION TOTAL PRICE

        function totalPrice() {
          // Determine total quantity

          let productsQuantities = document.querySelectorAll(".itemQuantity");
          // let productsQuantities = document.getElementsByClassName('itemQuantity');
          console.log(productsQuantities);
          let myCart = productsQuantities.length,
            totalQuantity = 0;
          console.log(myCart);

          for (var i = 0; i < myCart; ++i) {
            totalQuantity += productsQuantities[i].valueAsNumber;
          }

          let productTotalQuantity = document.getElementById("totalQuantity");
          productTotalQuantity.innerText = totalQuantity;

          // Calculate total price
          displayTotalPrice = 0;

          for (var i = 0; i < myCart; ++i) {
            displayTotalPrice +=
              productsQuantities[i].valueAsNumber * products.price;
          }

          let showTotalPrice = document.getElementById("totalPrice");
          showTotalPrice.innerText = displayTotalPrice;
        }
        totalPrice();
      });
  });
}

// FORM

// FORM
var regExText = /^[a-zA-Z\s\'\-]{3,10}$/; // use regExText for three values; firstName, lastName and city
var regExAddress =
  /^[0-9]{1,5}[" "]{1}[a-zA-z0-9/\\''(),-\s]{2,255}[" "]{1}[0-9]{5}$/;
var regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

function validateFirstName() {
  // Choose the input for firstName
  // Create regEx to test input for 3-10 allowed characters, special characters are not allowed  regExText;
  let firstName = document.getElementById("firstName").value;

  if (regExText.test(firstName)) {
    //if input is valid, update page to show succesful entry
    document.getElementById("firstNameErrorMsg").innerText =
      "✅ Name is valid!";
    return true;
  } else {
    //if input is invalid, update page to prompt for new input
    document.getElementById("firstNameErrorMsg").innerText =
      "⚠️ Please enter a valid name using 3-10 characters";
    return false;
  }
}

function validatelastName() {
  let lastName = document.getElementById("lastName").value;

  if (regExText.test(lastName)) {
    document.getElementById("lastNameErrorMsg").innerText =
      "✅ Last name is valid!";
    return true;
  } else {
    document.getElementById("lastNameErrorMsg").innerText =
      "⚠️ Please enter a valid last name using 3-10 characters";
    return false;
  }
}

function validateAddress() {
  let address = document.getElementById("address").value;

  if (regExAddress.test(address)) {
    document.getElementById("addressErrorMsg").innerText =
      "✅ Address is valid!";
    return true;
  } else {
    document.getElementById("addressErrorMsg").innerText =
      "⚠️ Format E.g.: 01 xxxxxxxx 12345";
    return false;
  }
}

function validateCity() {
  let city = document.getElementById("city").value;

  if (regExText.test(city)) {
    document.getElementById("cityErrorMsg").innerText =
      "✅ City name is valid!";
    return true;
  } else {
    document.getElementById("cityErrorMsg").innerText =
      "⚠️ Please enter a valid city name!";
    return false;
  }
}

function validateEmail() {
  let email = document.getElementById("email").value;

  if (regExEmail.test(email)) {
    document.getElementById("emailErrorMsg").innerText =
      "✅ Email address is valid!";
    return true;
  } else {
    document.getElementById("emailErrorMsg").innerText =
      "⚠️ Please enter a valid email address!";
    return false;
  }
}

var formSubmitButton = document.querySelector(".cart__order__form");

formSubmitButton.addEventListener("change", function () {
  validateFirstName(firstName);
  validatelastName(lastName);
  validateAddress(address);
  validateCity(city);
  validateEmail(email);
});

const formButton = document.getElementById("order");
console.log(formButton);

formButton.addEventListener("click", (event) => {
  event.preventDefault();

  // put the form values in an object
  // put the values of the form and the selected products in an object to send to the server

  var contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  if (
    firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    address.value.length == 0 ||
    city.value.length == 0 ||
    email.value.length == 0
  ) {
    alert("⚠️ Please fill the form!");
  } else if (
    regExEmail.test(email.value) == false ||
    regExAddress.test(address.value) == false ||
    regExText.test(city.value) == false ||
    regExText.test(firstName.value) == false ||
    regExText.test(lastName.value) == false
  ) {
    alert("⚠️ Please provide valid values on the form!");
  } else if (productLocalStorage == null || productLocalStorage == 0) {
    alert("⚠️ Please choose a product!");
  } else {
    localStorage.setItem("contact", JSON.stringify(contact));

    let products = []; // see id of selected product

    productLocalStorage.forEach((productSelected) => {
      products.push(productSelected.productId);
    });

    console.log(products);
    console.log(typeof products); // object

    let userInfo = {
      contact, // object type
      products, // object type
    };

    console.log(userInfo);
    console.log(typeof contact); // object

    let urlOrder = "https://p5-back.onrender.com/api/products/order";

    fetch(urlOrder, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (info) {
        console.log(info);

        location.href = `confirmation.html?id=${info.orderId}`;

        console.log(`confirmation.html?id=${info.orderId}`);
      })
      .catch(function (error) {
        alert("⚠️ Post error!");
      });
  }
});

////////////////////////////////
