'use strict';

// I. Global variables

// This global variable holds the array of all products, populated with the name, filepath, and number of votes of each product by the constructor function "Product."
var allProducts = [];
// console.log('The allProducts array:', allProducts);

// This global variable holds the array of recent random numbers, used to compare against a new random number, so that the same product image won't be repeated on one page.
var recentRandomNumber = [];

// This is the parent element used to place the event listener on the DOM.
var writeNewRandomImages = document.getElementById('product-images');

// These global variables are used to write each of three random images to the DOM.
var imageOneElement = document.getElementById('imageOne');
var imageTwoElement = document.getElementById('imageTwo');
var imageThreeElement = document.getElementById('imageThree');

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

//These are all of my object instances, which will feed the needed two arguments into the constructor function "Product", which in turn will populate the global variable "allProducts," which is an arry.
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// 1.2 Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

function render() {
  var randomIndex1;
  do {
    randomIndex1 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex1));

  recentRandomNumber.push(randomIndex1);

  var randomIndex2;
  do {
    randomIndex2 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex2));

  recentRandomNumber.push(randomIndex2);

  var randomIndex3;
  do {
    randomIndex3 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex3));

  recentRandomNumber.push(randomIndex3);
  // console.log(recentRandomNumber); // this is always only three new numbers.
  recentRandomNumber = [randomIndex1, randomIndex2, randomIndex3];

  imageOneElement.src = allProducts[randomIndex1].filepath;
  imageOneElement.alt = allProducts[randomIndex1].name;

  imageTwoElement.src = allProducts[randomIndex2].filepath;
  imageTwoElement.alt = allProducts[randomIndex2].name;

  imageThreeElement.src = allProducts[randomIndex3].filepath;
  imageThreeElement.alt = allProducts[randomIndex3].name;

  // console.log('this is the recentRandomNumer array at the end of the function', recentRandomNumber); // this is six numbers after the first click.

}


// Helper function: generates a random number between a min and a max, inclusive, and rounds it down to the nearest whole number.
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 1.3 Attach an event listener to the section of the HTML page where the images are going to be displayed.
writeNewRandomImages.addEventListener('click', function(event) {
  // 1.4 Once the user ‘clicks’ a product, generate three new products for the user to pick from.
  render();

  var productVote = event.target.alt;
  for (var i = 0; i < allProducts.length; i++) {
    if(productVote === allProducts[i].alt) {
      allProducts[i].votes++;
    }
  }
});

// These are the file's executable functions

render();

