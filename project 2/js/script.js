"use strict";

/*****************

Once upon a time the internet
Rose-Marie Dion

******************/
//variables for the choices of names
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

//variable for all the chosen answers
let chosenAnswer;

//variables for the choices of character
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

//variables for the choices of actions
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

//variables for the choices of moments
let moments = [
  "in the morning",
  "at night",
  "during the break",
  "in the afternoon",
  "before noon"
];
let chosenMoment;

//variables for the choices of where the story take place
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

//array for the chosen answers
let answers = [];

// start the game
let state = "one";

// How many choices by question the user has
const NUM_OPTIONS = 3;

// Get setup!
$(document).ready(setup);

// setup()
//
// Description of setup

function setup() {
// displaying the different div needed at this part
  $('#click-to-start').on('click', startGame);
  $('#instructions').hide();
  $('#question').hide();
  $('#narrator').hide();
  $('#story').hide();
}

function startGame() {
// starting the game
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
  // css properties of the button
  $button.css({
    "font-family": "Sniglet",
    display: 'block',
    width: 100,
    margin: 'auto',
    marginTop: 10,
  });
  // Listen for a click on the button which means the user has guessed
  $button.on('click', function() {
    // If the button they clicked on has a label matching the correct answer...
    chosenAnswer = $(this).text();
    console.log(chosenAnswer);
    // Remove all the buttons
    $('.guess').remove();
    // different state of the game
    // what's the name of the character
    switch (state) {
      case "one":
        chosenName = chosenAnswer;
        state = "two";
        roundTwo();
        break;
    // what type of animal is the character
      case "two":
        chosenAnimal = chosenAnswer;
        state = "three";
        roundThree();
        break;
    // what is the character doing
      case "three":
        chosenAction = chosenAnswer;
        state = "four";
        roundFour();
        break;
    // when in the day the story take place
      case "four":
        chosenMoment = chosenAnswer;
        state = "five";
        roundFive();
        break;
    // where is the story taking place
      case "five":
        chosenPlace = chosenAnswer;
        state = "story";
    // the story is finish
        story();
        break;

    }

  });
  // add the button
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
  $('#instructions').show();
  $('#instructions').text('Chose a name!');
}

function roundTwo() {
  // choose between the possible animals
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('animals');
    let answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);
  }
  $('#instructions').text('Chose an animal!');
}

function roundThree() {
  // choose between the possible actions
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('actions');
    let answer = actions[Math.floor(Math.random() * actions.length)];
    addButton(answer);
    answers.push(answer);
  }
  $('#instructions').text('Chose an action!');
}

function roundFour() {
  // choose between the possible moments
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('moments');
    let answer = moments[Math.floor(Math.random() * moments.length)];
    addButton(answer);
    answers.push(answer);
  }
  $('#instructions').text('Chose a moment!');
}

function roundFive() {
  // choose between the possible places
  answers = [];
  // Loop between all the answers
  for (let i = 0; i < NUM_OPTIONS; i++) {
    console.log('moments');
    let answer = places[Math.floor(Math.random() * places.length)];
    addButton(answer);
    answers.push(answer);
  }
  $('#instructions').text('Chose an place!');
}

// function for the story to be display on the screen
function story(result) {
  console.log("story there");
// hiding the text of each state
  $('#instructions').hide();
// varible to make a random story
  var story = {
    "start": "Once upon a time, #name# the #animal# #action# #moment# #place#",
// the different variable that the player chose
    "name": [chosenName],
    "animal": [chosenAnimal],
    "action": [chosenAction],
    "moment": [chosenMoment],
    "place": [chosenPlace]
  }

// variable to use tracery
  var grammar = tracery.createGrammar(story);
  var result = grammar.flatten("#start#");
  console.log(result);
  $('#story').show();
  $('#story').text(result);
  responsiveVoice.speak(result, 'UK English Male');
// set a timeout before showing the next step of the story
  setTimeout(narrator,5000);
}

// Interaction with the narrator of the story
function narrator() {
  console.log('narrator');
// Variable to interact with the player
  $('#question').show();
  $('#question').text('Do you want me to continue?');

// annyang
  var respond;
  if (annyang) {
// if the player wants to continue
    let showMore = function() {
    respond = "once upon a time, the player of this game decided to see more"
    responsiveVoice.speak(respond, 'UK English Male');
    $('#narrator').show();
    $('#narrator').text(respond);
    }
// if the player doesn't want to continue
    let showLess = function() {
    respond = "Are you sure you don't want me to continue to tell you a story?"
    responsiveVoice.speak(respond, 'UK English Male');
    $('#narrator').show();
    $('#narrator').text(respond);
    }
// possible answers for the player to use 
    let commands = {
      'Yes':showMore,
      'No' : showLess,
    }
    annyang.addCommands(commands);
    annyang.start();
    }

}
