
let queryString = window.location.search;

console.log(window.location); // See the properties of object "window.location"

let urlParams = new URLSearchParams(queryString);

let productId = urlParams.get("id");

console.log(productId); // Find ID of the Product

let urlProduct = `https://gulcancprojectkanap.herokuapp.com/api/products/${productId}`;

console.log(urlProduct); // Find full URL of the Product

function getProduct() {
    fetch(urlProduct).then((response) => {
        return response.json();

    }).then(function (product) {

        console.log(product);

        if (product) {
            displayProduct(product);
            addProductToCart(product);
        }

    }).catch((error) => {
        alert('Error fetch()!')

    })
}
getProduct();

// Display image, title, price, description and color option of one product

function displayProduct(product) {

    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.setAttribute('src', product.imageUrl);
    productImage.setAttribute('alt', product.altTxt);

    let productName = document.getElementById('title');
    productName.innerText = product.name;

    let productPrix = document.getElementById('price');
    productPrix.innerText = product.price;

    let productDescription = document.getElementById('description');
    productDescription.innerText = product.description;

    // Use forEach Method to display different colors
    // choose color, if you write productColor.innerText = product.colors, it shows three colors at the same line, it is a mistake
    product.colors.forEach(color => {
        console.log(color);
        let productColor = document.createElement("option");
        document.getElementById('colors').appendChild(productColor);
        productColor.setAttribute('value', color);
        productColor.innerText = color;
        // productColor.value = color;
        // productColor.innerText = color;
    });
}

// Call DOM elements 

let addButton = document.getElementById("addToCart");
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');

// Store the values in the local storage
// Declare the varible "productLocalStorageString", I want to call the saved products in the local storage in which I will add the keys and values 
// The JSON.parse() method parses a JSON string and construct the JavaScript value or object described by the string

let productLocalStorageString = localStorage.getItem("product");
console.log(productLocalStorageString); // At first it is "null", the key/value pair is string

let productLocalStorage = JSON.parse(productLocalStorageString);
console.log(productLocalStorage);

function addProductToCart(product) {
    addButton.addEventListener("click", (event) => {

        // create an object that holds 3 properties of choosed product

        let productProperties = {
            productId: productId,
            productColor: color.value,
            productQuantity: Number(quantity.value),
        }

        if ((quantity.value == 0 || quantity.value == null) && (color.value == 0 || color.value == null)) {
            alert('⚠️ Please choose the quantity and a color!');
            window.location.reload();
        }
        else if (color.value == 0 || color.value == null) {
            alert('⚠️ Please choose a color!');
            window.location.reload();
        }
        else if (quantity.value == 0 || quantity.value == null) {
            alert('⚠️ Please choose the quantity enter 0 and 101!');
            window.location.reload();
        }
        else if (quantity.value < 0) {
            alert('⚠️ You can NOT choose a negative value!');
            window.location.reload();
        }
        else if (quantity.value > 100) {
            alert('⚠️ You can NOT choose a value greater than 100!');
            window.location.reload();
        }
        else if (quantity.value > 0 && quantity.value <= 100) {

            const messageAlert = function () {

                alert(`
                ✅ The selected product was added to the cart! 
                
                ✔️ Product quantity: ${productProperties.productQuantity} 
                ✔️ Product name: ${product.name} 
                ✔️ Product color: ${productProperties.productColor}`);
            }

            if (productLocalStorage == null || productLocalStorage == 0) {
                productLocalStorage = [];
                productLocalStorage.push(productProperties);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                messageAlert();
                location.assign("cart.html");
            }

            else {
                const filterProduct = productLocalStorage.findIndex(
                    item => item.productId === productId && item.productColor === color.value);

                console.log(filterProduct);

                if (filterProduct >= 0) {
                    newQuantity = Number(productProperties.productQuantity) + Number(productLocalStorage[filterProduct].productQuantity);


                    if (productLocalStorage[filterProduct].productQuantity == 100) {
                        alert(`⚠️ You have already added "${productLocalStorage[filterProduct].productQuantity}" product for the product "${product.name}", thus you can NOT add more product!`);
                        window.location.reload();
                    }

                    else if ((productLocalStorage[filterProduct].productQuantity + productProperties.productQuantity) > 100) {
                        alert(`⚠️ You have already added "${productLocalStorage[filterProduct].productQuantity}" products for the product "${product.name}", thus you can add maximum "${100 - productLocalStorage[filterProduct].productQuantity}" from the same product!`);
                        window.location.reload();

                    }

                    else if (newQuantity <= 100) {
                        productLocalStorage[filterProduct].productQuantity = newQuantity;
                        localStorage.setItem("product", JSON.stringify(productLocalStorage));
                        messageAlert();
                        location.assign("cart.html");
                    }
                }

                else {
                    productLocalStorage.push(productProperties);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    messageAlert();
                    location.assign("cart.html");
                }
            }
        } else {
            alert('⚠️ Product is not shown on the product page!')

        }
    })
}


  // Go to all the products and search for the product id and color. If a product id and color matches with my product filter method will return that product
  // and it will be stored in the filterProduct variable, I will add this product to the cart
  // You can use an alternative way for "location.assign()" => window.location.href = "cart.html";

