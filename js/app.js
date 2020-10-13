'use strict';

// Goal 1: As a user, I would like to display three unique products by chance so that my viewers can pick a favorite.

// Goal 2: As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.

// Goal 3: As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.

// Goal 4: As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.

// This global variable holds the array of all products, populated with the name, filepath, and number of votes of each product by the constructor function "Product."
var allProducts = [];
console.log(allProducts);

// This global variable holds the array of recent random numbers, used to compare against a new random number, so that the same product image won't be repeated on one page.
var recentRandomNumber = [];

var randomNumberSets = [];
console.log('This is the set of random numbers:', randomNumberSets);

// This is the parent element used to place the event listener on the DOM.
var writeNewRandomImages = document.getElementById('product-images');

// These global variables are used to write each of three random images to the DOM.
var imageOneElement = document.getElementById('imageOne');
var imageTwoElement = document.getElementById('imageTwo');
var imageThreeElement = document.getElementById('imageThree');
var resultParentElement = document.getElementById('results');
var renderResultsElement = document.getElementById('submit-button');

// This global variable is a counter for the event listener.
var k = 0;


// Feature tasks:

// 1.1 Build a constructor function that creates an object associated with each product and has the following properties:
// - Name of the product
// - File path of the image

function Product(productName, filepath) {
  this.product = productName;
  this.filepath = filepath;
  // 2.1 In the constructor function define a property to hold the number of times a product has been clicked.
  this.votes = 0;
  this.productDisplayCount = 0;

  // 4.1: Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered. [Not sure how to do this or what is being asked; created a running array of random numbers as a global variable called randomNumberSets.]

  // Pushes the data processed by the constructor function into a global variable that holds an array.
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

  allProducts[randomIndex1].productDisplayCount++;

  recentRandomNumber.push(randomIndex1);
  randomNumberSets.push(randomIndex1);

  var randomIndex2;
  do {
    randomIndex2 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex2));

  allProducts[randomIndex2].productDisplayCount++;

  recentRandomNumber.push(randomIndex2);
  randomNumberSets.push(randomIndex2);

  var randomIndex3;
  do {
    randomIndex3 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex3));

  allProducts[randomIndex3].productDisplayCount++;

  recentRandomNumber.push(randomIndex3);
  randomNumberSets.push(randomIndex3);

  // console.log(recentRandomNumber); // This shows the last six new numbers (the current and penultimate set).

  recentRandomNumber = [randomIndex1, randomIndex2, randomIndex3];

  imageOneElement.src = allProducts[randomIndex1].filepath;
  imageOneElement.alt = allProducts[randomIndex1].product;

  imageTwoElement.src = allProducts[randomIndex2].filepath;
  imageTwoElement.alt = allProducts[randomIndex2].product;

  imageThreeElement.src = allProducts[randomIndex3].filepath;
  imageThreeElement.alt = allProducts[randomIndex3].product;
}

// Helper functions
// This generates a random number between a min and a max, inclusive, and rounds it down to the nearest whole number.
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// This function is the event listener for clicks of the pictures.
function handleClick(event) {
  event.preventDefault();
  // This removes the event listener. (In the case of this code base, it's redundant, because the maxClick variable's if statement immedidately following turns it off; but it's here per instructions and to imitate scalability.)
  if (k >= 5) {
    writeNewRandomImages.removeEventListener('click', handleClick);
  }
  // 3.1: By default, the user should be presented with 25 rounds of voting before ending the session.
  // 3.2: Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
  var maxClick = 5;
  if (k < maxClick) {
    k++;

    // 1.4: Once the user ‘clicks’ a product, generate three new products for the user to pick from.
    render();
    // 2.2: After every selection by the viewer, update the newly added property to reflect if it was clicked.
    var productVote = event.target.alt;

    for (var i = 0; i < allProducts.length; i++) {
      if(productVote === allProducts[i].product) {
        allProducts[i].votes++;
      }
    }
  }
}

//This function is the event listener for the sumbit results button.
function submitResults(event) {
  event.preventDefault();
  renderPollResults();

}

//This method writes the results to the DOM.
Product.prototype.renderResults = function() {
  var liElement = document.createElement('li');
  liElement.textContent = `The ${this.product} product received ${this.vote} votes after being shown ${this.productDisplayCount} times.`;
  resultParentElement.appendChild(liElement);
};

function renderPollResults() {
  for (var j = 0; j < allProducts.length; j++) {
    allProducts[j].renderResults();
  }
}

// 1.3 Attach an event listener to the section of the HTML page where the images are going to be displayed.
writeNewRandomImages.addEventListener('click', handleClick);

//4.3 Add a button with the text View Results, which when clicked displays the list of all the products followed by the votes received, and number of times seen for each.
renderResultsElement.addEventListener('submit', submitResults);

// These are the file's executable functions
render();
// renderPollResults();
