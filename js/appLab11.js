'use strict';

// Global variables.

var allProducts = []; //Array holding data for each object instance.
var recentRandomNumber = []; //Array holding the last six random numbers generated.
var randomNumberSets = []; //Array holding all of the random numbers for this session.

var imageOneElement = document.getElementById('imageOne'); //Writes image one to the DOM.
var imageTwoElement = document.getElementById('imageTwo'); //Writes image two to the DOM.
var imageThreeElement = document.getElementById('imageThree'); //Writes image three to the DOM.

var writeNewRandomImages = document.getElementById('product-images'); //Writes click event listener to the DOM.
var renderImagesResultsElement = document.getElementById('submit-button'); //Writes the submit button event listener to the DOM.
var resultParentElement = document.getElementById('results'); //Writes the results to the DOM.

var k = 0; // This is a counter for the event listener that tracks the number of clicks.

// Constructor function and object instances.

function Product(productName, filepath) {
  this.product = productName;
  this.filepath = filepath;
  this.votes = 0; //This property holds the votes that each object instance receives.
  this.productDisplayCount = 0; //This property contains the number of times a product has been displayed.

  allProducts.push(this); //This line pushes each of the above properties into the global array of the object instances.
}

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

// Helper functions.

function getRandomNumber(min, max){ // This generates a random number between a defined min and max.
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderImages() { // This picks and renders the images.

  var randomIndex1; // This is random number 1 of 3 for the first of three images.
  do {
    randomIndex1 = getRandomNumber(0, allProducts.length - 1);
  } while (recentRandomNumber.includes(randomIndex1));

  allProducts[randomIndex1].productDisplayCount++; // This adds one for every time an image is displayed.

  recentRandomNumber.push(randomIndex1); // This pushes random number 1 into the recentRandomNumber array.
  randomNumberSets.push(randomIndex1); // This pushes random number 1 into the randomNumberSets array.

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

  recentRandomNumber = [randomIndex1, randomIndex2, randomIndex3]; // This resets the recentRandomNumber array so that there are never more than six numbers (the last and penultimate sets) in it, so that one image won't repeat in two rounds.

  imageOneElement.src = allProducts[randomIndex1].filepath; // This gets the image associated with random number 1 and sends it to the parent to be written to the DOM.
  imageOneElement.alt = allProducts[randomIndex1].product; // This gets the name of the image associated with random number 1 and sends it to the parent to be written to the DOM.

  imageTwoElement.src = allProducts[randomIndex2].filepath;
  imageTwoElement.alt = allProducts[randomIndex2].product;

  imageThreeElement.src = allProducts[randomIndex3].filepath;
  imageThreeElement.alt = allProducts[randomIndex3].product;
}

//This method writes the results to the DOM.
Product.prototype.renderImagesResults = function() {
  var liElement = document.createElement('li');
  liElement.textContent = `The ${this.product} product received ${this.votes} votes after being shown ${this.productDisplayCount} times.`;
  resultParentElement.appendChild(liElement);
};

function renderImagesPollResults() {
  for (var j = 0; j < allProducts.length; j++) {
    allProducts[j].renderImagesResults();
  }
}

// Callback functions for the event listeners.

function handleClick(event) { // Listens for clicks on the images, up to 25.
  event.preventDefault();

  if (k >= 25) { // This removes the event listener after 25 clicks.
    writeNewRandomImages.removeEventListener('click', handleClick);
    renderImagesPollResults();

  }
  var maxClick = 25;
  if (k < maxClick) { // This limits the product survey to 25 clicks.
    k++;
    renderImages();

    var productVote = event.target.alt; // This stores the name of the image that was clicked.
    for (var i = 0; i < allProducts.length; i++) {
      if(productVote === allProducts[i].product) {
        allProducts[i].votes++; // This puts votes into the array this.votes for each image that receives a vote.
      }
    }
  }
}

// Executable functions and event listeners.

writeNewRandomImages.addEventListener('click', handleClick);
renderImages();
