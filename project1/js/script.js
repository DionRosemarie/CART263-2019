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
let numLeaf = 6;


$(document).ready(function() {
  $ant = $('#ant');
  $wind = $('#wind');
  $leaf = $('.leaf');
  console.log($leaf);
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
  }, function () {
    console.log("remove");
    $(ui.draggable).remove();
    numLeaf -=1;
    console.log(numLeaf);

  })

  $($wind).show();
  $($wind).fadeOut(500);
}
