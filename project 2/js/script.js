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
let chosenAnswer;
let chosenName;
let chosenAnimal;
let chosenAction;
let chosenMoment;
let chosenPlace;

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


let moments = [
  "in the morning",
  "at night",
  "during the break",
  "in the afternoon",
  "before noon"
];


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


let answers = [];

let state = "one";

// How many choices by question the user has
const NUM_OPTIONS = 3;

// Get setup!
$(document).ready(setup);

// setup()
//
// Description of setup

function setup() {
  $('#click-to-start').on('click', startGame);
  $('#story').hide();
}

function startGame() {
  $('#click-to-start').remove();
  roundOne();
}

function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div class="guess"></div>');
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  $button.css({"font-family":"Sniglet"});
  // Listen for a click on the button which means the user has guessed
  $button.on('click', function() {
    // If the button they clicked on has a label matching the correct answer...
    chosenAnswer = $(this).text();
    console.log(chosenAnswer);
    // Remove all the buttons
    $('.guess').remove();

    switch (state) {
      case "one":
        chosenName = chosenAnswer;
        state = "two";
        roundTwo();
        break;

      case "two":
        chosenAnimal = chosenAnswer;
        state = "three";
        roundThree();
        break;

      case "three":
        chosenAction = chosenAnswer;
        state = "four";
        roundFour();
        break;

      case "four":
        chosenMoment = chosenAnswer;
        state = "five";
        roundFive();
        break;

      case "five":
        chosenPlace = chosenAnswer;
        state = "story";
        story();
        break;

    }

  });
  // Finally, add the button to the page so we can see it
  $('body').append($button);
}


function roundOne() {
  // choose between the possible names
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('animals');
    let answer = names[Math.floor(Math.random() * names.length)];
    addButton(answer);
    answers.push(answer);
  }

}

function roundTwo() {
  // choose between the possible names
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('animals');
    let answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);
  }

}

function roundThree() {
  // choose between the possible names
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('actions');
    let answer = actions[Math.floor(Math.random() * actions.length)];
    addButton(answer);
    answers.push(answer);
  }

}

function roundFour() {
  // choose between the possible names
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('moments');
    let answer = moments[Math.floor(Math.random() * moments.length)];
    addButton(answer);
    answers.push(answer);
  }

}

function roundFive() {
  // choose between the possible names
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('moments');
    let answer = places[Math.floor(Math.random() * places.length)];
    addButton(answer);
    answers.push(answer);
  }

}

function story(result) {
  console.log("story there");

  var story = {
    "start": "Once upon a time, #name# the #animal# #action# #moment# #place#",
    "name": [chosenName],
    "animal": [chosenAnimal],
    "action": [chosenAction],
    "moment": [chosenMoment],
    "place": [chosenPlace]

  }
  var grammar = tracery.createGrammar(story);
  var result = grammar.flatten("#start#");
  console.log(result);
  $('#story').show();
  $('#story').text(result);

}
