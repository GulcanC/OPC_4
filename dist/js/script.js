
// DISPLAY ALL THE PRODUCTS ON THE HOME PAGE
// 1. Use fetch Method, it is a simple GET request, Fetch() is returning a promise
// 2. Use then() which resolves the promise to a response, I will catch the response object with my response variable which I have as an argument
// 3. Response object has a json method which is used to parse the response's body to a js object. Here jason method will give me an array that holds my products
// 4. json method resturns also a promise, so use another then() to catch the array of products with the variable "products" that I  have as an argument

var url = "http://localhost:3000/api/products";

function displayAllProducts() {
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (products) {
      console.log(products);

      // 5. Use forEach Method

      products.forEach(product => {

        // products.forEach(function(product) {});

        console.log(product);

        // 6. Use "createElement, appendChild, setAttribute" Methods
        // setAttribute(name, value) => it adds the name of the attribute and its value, setAttribute("href", url)
        // createElement("img") => it adds an <img> element 
        // appendChild() => it adds your HTML element to the existing HTML element 

        let productLink = document.createElement('a');
        productLink.setAttribute('href', `product.html?id=${product._id}`);
        document.getElementById('items').appendChild(productLink);

        // You can also use this opportunity => productLink.href = `product.html?id=${product._id}`;
        // This is short way for setAttribute but use always "setAttribute" which is clear to understand the code

        let article = document.createElement('article');
        productLink.appendChild(article);

        let image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        article.appendChild(image);

        let title = document.createElement('h3');
        title.setAttribute('class', 'productName');
        article.appendChild(title);
        title.innerText = product.name;

        let description = document.createElement('p');
        description.setAttribute('class', 'productDescription');
        article.appendChild(description);
        description.innerText = product.description;

      });

    })
    .catch(function (error) {
      alert("⚠️ Error! Fetch()!")
    });
}
displayAllProducts();

