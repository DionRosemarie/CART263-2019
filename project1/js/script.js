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
let $leaf;
let swap;
let $wind;


$(document).ready(function() {
  $ant = $('#ant');
  $wind = $('#wind');
  $leaf = $('.leaf');
  swap = false;

  $($wind).hide();



  $leaf.draggable({
    start: function(event, ui) {
      console.log('start');
      swap = true;
      setInterval(swapImages, 200);
    },
    stop: function(event, ui) {
      swap = false;
    }

  });

  //$('#leaf1').addClass('leaf1')



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
function leafDropped(event, ui) {
  console.log('leaf');
  $(ui.draggable).animate({
    left: -400,
    top: -100,
    opacity: 0,
  })

  $($wind).show();
  $($wind).fadeOut(500);
}
