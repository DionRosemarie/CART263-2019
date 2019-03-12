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
$(document).ready(setup)

// setup()
//
// Description of setup

function setup() {
// displaying the different div needed at this part
//$('#click-to-start').on('click', roundOne);
$('#click-to-start').unbind('click').click(roundOne);
  $('#instructions').hide();
  $('#question').hide();
  $('#narrator').hide();
  $('#story').hide();

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
    backgroundColor: 'white',
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 10
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
        storyOne();
        break;
    }

  });
  // add the button
  $('body').append($button);
}

function roundOne() {
  console.log('roundone')
  $('#click-to-start').remove();
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
function storyOne() {
  console.log("story there");
  $('#instructions').text('story time');
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
  responsiveVoice.speak(result, 'UK English Female',{pitch:1},{rate:1});
  animationText();
// set a timeout before showing the next step of the story
  setTimeout(narrator,5000);
}
function animationText() {
  console.log('text animation');
  var text = $('#story');

  var split = new SplitText(text);

  function random(min, max){
  	return (Math.random() * (max - min)) + min;
  }

  $(split.chars).each(function(i){
  	TweenMax.from($(this), 2.5, {
  		opacity: 0,
  		x: random(-500, 500),
  		y: random(-500, 500),
  		z: random(-500, 500),
  		scale: .1,
  		delay: i * .02,
  		yoyo: true,
  		repeat: -1,
  		repeatDelay: 10
  	});
  });
}

// function for the story to be display on the screen
function storyTwo() {
  console.log("story two there");
  $('#question').hide();

// varible to make a random story
  var storyTwo = {
    "start": "Everything was going #adjective# when suddenly Jack the #job# who loves to #hobby# came in running with a #object# in the room. Everybody who witnessed the scene started #verb# and decided to do #movement# to help the situation. But wait! said #name#, what is the noise I hear? This is when the #hero# of the situation came to the rescue. Berret the #qualitie# ran into the window on his #transport# and knocked down Jack. Everybody was #emotion# of how everything ended and went back home from the #place#. #name# the #animal# was so #emotion# that she went to see Berret to give him a #gift#. The end",
// the different variable that the player chose
    "adjective":[adjective],
    "job":[job],
    "hobby":[hobby],
    "object":[object],
    "verb":[verb],
    "movement":[movement],
    "name": [chosenName],
    "hero" : [hero],
    "qualitie": [qualitie],
    "transport": [transport],
    "emotion": [emotion],
    "place": [chosenPlace],
    "animal": [chosenAnimal],
    "gift":[gift]
  }

// variable to use tracery
  var grammar = tracery.createGrammar(storyTwo);
  var resultTwo = grammar.flatten("#start#");
  console.log(storyTwo);
  $('#story').show();
  $('#story').text(story);
  $('#story').text(resultTwo);
  responsiveVoice.speak(resultTwo, 'UK English Male',{rate:0.5,pitch:0.5});

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
    storyTwo();
    }
// if the player doesn't want to continue
    let showLess = function() {
    endGame();
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


function endGame() {
  $('#instructions').remove();
  $('#narrator').show();
  $('#narrator').css({'color':'white'});
  $('#narrator').text('You are missing something');
  $('#narrator').fadeOut(3000);
  $('body').css({"background-color":"black"});
}
