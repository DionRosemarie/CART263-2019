"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let size = 100;
let pattern;
$(document).ready(setup)
function setup() {
  // set up the base pattern
  pattern = Trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    cell_size: size})

  // canvas
  document.body.appendChild(pattern.canvas())
}

$('body').on('click', function(){
  console.log('click');
 pattern.recalculate({variance:5})
})
