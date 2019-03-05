"use strict";

/*****************

Once upon a time the internet
Rose-Marie Dion

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let name = [
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

let animal = [
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

let action = [
  "cries",
  "laughes",
  "screams",
  "complains",
  "runs",
  "falls",
  "yells",
  "signs"
];

let moment = [
  "in the morning",
  "at night",
  "during the break",
  "in the afternoon",
  "before noon"
];

let place = [
  "in the shower",
  "at school",
  "at work",
  "at the party",
  "at the bar",
  "at the clinic",
  "at the kitchen counter",
  "at the movie theater"
];

// How many choices by question the user has
const NUM_OPTIONS = 3;

// Get setup!
$(document).ready(setup);


// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  $('#click-to-start').on('click', startGame);
  $('#click-to-begin').hide();
}

function startGame() {
  $('#click-to-start').remove();
  instruction();
}

function instruction() {
  $('#click-to-begin').show();
  push();
  textAlign(CENTER);
  textSize(20);
  fill(0);
  text("Choose between all the propose choices to create your own story", width/2, height/2);
  pop();
  $('#click-to-begin').on('click', roundOne);

}

function roundOne() {
  $('#click-to-begin').remove();
}
