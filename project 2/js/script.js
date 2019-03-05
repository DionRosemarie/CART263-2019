"use strict";

/*****************

Once upon a time the internet
Rose-Marie Dion

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Get setup!
$(document).ready(setup);


// setup()
//
// Description of setup

function setup() {
  $('#click-to-start').on('click', startGame);
}

function startGame() {
  $('#click-to-start').remove();

}
