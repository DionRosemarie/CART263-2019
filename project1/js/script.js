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
let swap;

$(document).ready(function() {
  $ant = $('#ant');
  $leaf = $('#leaf');
  swap = false;



  $($leaf).draggable({
     start: function( event, ui ) {
     swap = true;
     setInterval(swapImages,100);},
     stop: function( event, ui) {
    swap = false;
     }
  });

  $($ant).droppable({
    drop: leafDropped,

  })

});

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

  function leafDropped() {
    $($leaf).animate({
      left: -400,
      top: -100,
      opacity: 0,
    })

  }
