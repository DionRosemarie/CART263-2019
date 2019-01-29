/*****************

Happines is Sisyphus?
Rose-Marie Dion

******************/


//function setup() {
  // Creating the canvas
//  createCanvas(800, 500);
//  background(255);
//}
let $ant;
let $leaf;

$(document).ready(function() {
  $ant = $('#ant');
  $leaf = $('#leaf');

  $($leaf).draggable();
})
