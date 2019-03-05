"use strict";

/*****************

Once upon a time the internet
Rose-Marie Dion

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let names = [
  "Jeremy",
  "Alicia",
  "Matthew",
  "Sophia",
  "Xavier",
  "Lea",
  "Samuel",
  "Constance",
  "Joseph",
  "Catherine",
  "Fiona"
];
let chosenName;

let animals = [
  "snake",
  "elephant",
  "crocodile",
  "ladybug",
  "spider",
  "goldfish",
  "sloth",
  "monkey",
  "cow",
  "giraffe",
  "hippopotamus",
];
let chosenAnimal;

let actions = [
  "cries",
  "laughes",
  "screams",
  "complains",
  "runs",
  "falls",
  "yells",
  "signs"
];
let chosenAction;

let moments = [
  "in the morning",
  "at night",
  "during the break",
  "in the afternoon",
  "before noon"
];
let chosenMoment;

let places = [
  "in the shower",
  "at school",
  "at work",
  "at the party",
  "at the bar",
  "at the clinic",
  "at the kitchen counter",
  "at the movie theater"
];
let chosenPlace;

let answers = [];

// How many choices by question the user has
const NUM_OPTIONS = 3;

// Get setup!
$(document).ready(setup);


// setup()
//
// Description of setup

function setup() {
  //createCanvas(windowWidth,windowHeight);
  $('#click-to-start').on('click', startGame);
//  $('#click-to-begin').hide();
}

function startGame() {
  $('#click-to-start').remove();
  roundOne();
}

/*function instruction() {
  $('#click-to-begin').show();
  push();
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Choose between all the propose choices to create your own story", width/2, height/2);
  pop();
  $('#click-to-begin').on('click', roundOne);

}*/

function roundOne() {
//  $('#click-to-begin').remove();
// choose between the possible names
  answers = [];
// Loop between all the answers
for (let i = 0; i < NUM_OPTIONS; i++) {
  console.log('choices');
  let answer = names[Math.floor(Math.random() * names.length)];
  addButton(answer);
  answers.push(answer);
}

}

function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div class="guess"></div>');
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click', function() {
    // If the button they clicked on has a label matching the correct answer...
    chosenName = $(this).text();
    console.log(chosenName);
      // Remove all the buttons
      $('.guess').remove();
      roundTwo()
  });
  // Finally, add the button to the page so we can see it
  $('body').append($button);
}
