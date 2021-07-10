# Code 201 | LAB - 11

## Project Name: BusMall

This app is intended to fulfill the requirements set out in the description of lab 11, namely the following:

- [] display three unique products by chance so that the viewers can pick a favorite;
- [] create an object that is associated with each product with the following properties:
  - [] name of the product;
  - [] file path of image;
  - [] times the image has been shown.
- [] create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window;
- [] for each of the three images, increment its property of times it has been shown by one;
- [] attach an event listener to the section of the HTML page where the images are going to be displayed;
- [] once the users ‘clicks’ a product, generate three new products for the user to pick from;
- [] track the selections made by viewers;
- [] store the number of times a product has been clicked in the object;
- [] after every selection by the viewer, update the newly added property to reflect if it was clicked;
- [] control the number of rounds a user is presented: by default, the user should be presented with 25 rounds of voting before ending the session;
- [] keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes;
- [] view a report of results after all rounds of voting have concluded so that the most popular products may be determined;
- [] create a property attached to the constructor function itself that keeps track of all the products that are currently being considered;
- [] after voting rounds have been completed, remove the event listeners on the product;
- [] add a button with the text "View Results" that, when clicked, displays the list of all the products followed by the votes received and number of times seen for each, e.g., "banana had 3 votes, and was seen 5 times";
- [] handle the display and voting for an arbitrary number of images;
- [] using a variable, declare in your JS how many images to show;
- [] based on that value, dynamically create that many <img> tags;
- [] based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.
- using ChartJS (imported from CDN), display the vote totals and the number of times a product was viewed in a bar chart format;
- [] place the bar chart in the section located beneath your three product images;
- [] ensure that the bar charts only appear after all voting data has been collected;
- [] implement local storage into your current application;
- [] make sure the data persists across both browser refreshes and resets.

## Author: Nathan Cox/seattle-201d68

## Collaborators

Code Fellows TAs who lent a hand at times of crises, and there were many: Skyler, Chance, Brai.

Classmates who read through code, helped debug, and shared code and ideas: Simon Panek, JP Jones.

## Links and Resources

Submission PR

[Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random);

[Charts with Mulitple Datasets](https://codepen.io/Shokeen/pen/NpgbKg);

## Reflections and Comments

This was a tricky assignment, which I woudldn't have completed without the help of Skyler, TA extraordinaire.

### Questions that occurred to me during the build

* renderImages function: I don't understand how the parameter `imageElement` ties `imageElement.src = allProducts[randomIndex].filepath` and `imageElement.alt = allProducts[randomIndex].name` to the invoked function `renderImages` with agrument of `imageOneElment`, `imageTwoElement`, and `imageThreeElement`.

© nathanRhead
