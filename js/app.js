'use strict';

var allProudcts = [];

// Goal 1: As a user, I would like to display three unique products by chance so that my viewers can pick a favorite.

// Feature tasks:

// 1.1 Build a constructor function that creates an object associated with each product and has the following properties:
// - Name of the product
// - File path of the image

function Product(productName, filepath) {
  this.product = productName;
  this.filepath = filepath;
  this.votes = 0;

  allProducts.push(this);
}

// 1.2 Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

// 1.3 Attach an event listener to the section of the HTML page where the images are going to be displayed.

// 1.4 Once the user ‘click’ a product, generate three new products for the user to pick from.
