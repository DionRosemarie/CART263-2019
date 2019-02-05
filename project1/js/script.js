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
// This variable let me have multiple leaf to drag
let arr = document.getElementsByTagName( "div" );
let swap;


$(document).ready(function() {
  $ant = $('#ant');
  $arr = $('#arr');
  swap = false;

  $(arr).draggable({
    start: function(event, ui) {
      swap = true;
      setInterval(swapImages, 200);
    },
    stop: function(event, ui) {
      swap = false;
    }

  });


  $($ant).droppable({
    drop: leafDropped,

  })

});

// Function to make the ant move
function swapImages() {
  if (swap === true) {
    if ($ant.attr('src') === 'assets/images/ant.png') {

      $ant.attr('src', 'assets/images/antMoved.png');

    } else {

      $ant.attr('src', 'assets/images/ant.png');
    }

  } else {

    $ant.attr('src', 'assets/images/ant.png');
  }
}

// Function to make the leaf go away when dropped
function leafDropped() {
  $(arr).animate({
    left: -400,
    top: -100,
    opacity: 0,
  })

}
