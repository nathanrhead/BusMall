'use strict';

// Global variables!

var allProducts = []; //Array holding data for each object instance.
var recentRandomNumber = []; //Array holding the last six random numbers generated.
var randomNumberSets = []; //Array holding all of the random numbers for this session.

var imageOneElement = document.getElementById('imageOne'); //Writes image one to the DOM.
var imageTwoElement = document.getElementById('imageTwo'); //Writes image two to the DOM.
var imageThreeElement = document.getElementById('imageThree'); //Writes image three to the DOM.

var writeNewRandomImages = document.getElementById('product-images'); //Writes click event listener to the DOM.

var maxClick = 25; // This is a counter for the event listener that tracks the number of clicks, up to 25.

// Constructor function and object instances.

function Product(productName, filepath, votes = 0, productDisplayCount = 0) {
  this.product = productName;
  this.filepath = filepath;
  this.votes = votes; //This property holds the votes that each object instance receives.
  this.productDisplayCount = productDisplayCount; //This property contains the number of times a product has been displayed.

  allProducts.push(this); //This line pushes each of the above properties into the global array of the object instances.
}

createProducts();

// Helper and call-back functions.

function getRandomNumber(min, max){ // This generates a random number between a defined min and max.
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderImages(imageElement) { // This picks and renders the images.
  var randomIndex = getRandomNumber(0, allProducts.length - 1);
  while (recentRandomNumber.includes(randomIndex)) {
    randomIndex = getRandomNumber(0, allProducts.length - 1); // This gets a new random number if the one just genearted matches any already in the recentRandomNumber array.
  }

  imageElement.src = allProducts[randomIndex].filepath; // This gets the image associated with the random number and sends it to the parent to be written to the DOM.
  imageElement.alt = allProducts[randomIndex].product; // This gets the name of the image associated with the random number and sends it to the parent to be written to the DOM.

  allProducts[randomIndex].productDisplayCount++; // This adds one to this object property for every time an image is displayed.

  recentRandomNumber.push(randomIndex); // This pushes the random number into the recentRandomNumber array.
  randomNumberSets.push(randomIndex); // This pushes the random number into the randomNumberSets array.

  if (recentRandomNumber.length > 5) {
    recentRandomNumber.shift();// This removes the first random number in the recentRandomNumber array when that array reaches six, so that there are no more than six numbers in the array at once.
  }
}

function compileCountArrays() {
  var productNames = [];
  var productVotes = [];
  var productDisplayCounts = [];

  for (var i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].product);
    productVotes.push(allProducts[i].votes);
    productDisplayCounts.push(allProducts[i].productDisplayCount);
  }
  return [productNames, productVotes, productDisplayCounts];
}
function handleClick(event) { // This is the call-back function that responds to clicks on images.
  event.preventDefault();

  var productVote = event.target.alt; // This stores the name of the image that was clicked.
  for (var i = 0; i < allProducts.length; i++) {
    if(productVote === allProducts[i].product) {
      allProducts[i].votes++; // This puts votes into the array this.votes for each image that receives a vote.
    }
  }
  renderImages(imageOneElement);
  renderImages(imageTwoElement);
  renderImages(imageThreeElement);
  localStorage.setItem('productData', JSON.stringify(allProducts)); // This writes allProducts to local storage after every click.

  maxClick -= 1;
  if (maxClick < 1) {
    writeNewRandomImages.removeEventListener('click', handleClick); // This removes the event listener after 25 clicks.
    compileCountArrays(); // This invokes the function to compile the names, votes, and display counts for the chart.
    displayChart(); // This invokes the function to write the populate and write the chart to the DOM.
  }
}

function createProducts() {

  if (localStorage.productData) {
    var localStorageString = localStorage.getItem('productData');
    var localStorageData = JSON.parse(localStorageString);

    for (var i = 0; i < localStorageData.length; i++) {
      var obj = localStorageData[i];
      var filepath = obj.filepath;
      var product = obj.product;
      var productDisplayCount = obj.productDisplayCount;
      var votes = obj.votes;
      new Product(product, filepath, votes, productDisplayCount);
    }
    // Create products from old data
  } else {
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

  }
}

// Chart.js code //

function displayChart() {
  var productPollCanvas = document.getElementById('myChart').getContext('2d');
  var chartData = compileCountArrays();

  var votingData = {
    label: 'Total Votes',
    data: chartData[1],
    backgroundColor: 'rgba(128, 212, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 173, 51, 1)',
    yAxisID: 'y-axis-votes'
  };

  var viewingData = {
    label: 'Total Views',
    data: chartData[2],
    backgroundColor: 'rgba(255, 173, 51, 0.6)',
    borderColor: 'rgba(128, 212, 255, 1)',
    borderWidth: 1,
    yAxisID: 'y-axis-views'
  };

  var productName = {
    labels: chartData[0],
    datasets: [votingData, viewingData],
    barPercentage: 0.9,
    barthickness: 'flex',
    maxBarThickness: 20,
    minBarLength: 2,
  };

  var canvasOptions = {
    // backgroundColor: 'rgba(245, 245, 220, 1)', //Don't know where to put this to make it work.
    scales: {
      xAxes: [{
      }],
      yAxes: [{
        id: 'y-axis-views'
      }, {
        id: 'y-axis-votes'
      }]
    }
  };

  var myChart = new Chart(productPollCanvas, {
    type: 'bar',
    data: productName,
    options: canvasOptions,
  });
}


// Executable functions and event listeners.

writeNewRandomImages.addEventListener('click', handleClick);

renderImages(imageOneElement);
renderImages(imageTwoElement);
renderImages(imageThreeElement);


