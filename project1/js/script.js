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


  $($leaf).draggable({
    start: setInterval(swapImages,500),
  });

  $($ant).droppable({
    drop: leafDropped,

  })

});

function swapImages() {
  if ($ant.attr('src') === 'assets/images/ant.png') {

  $ant.attr('src','assets/images/antMoved.png');

}
else {

  $ant.attr('src','assets/images/ant.png');
}

}

function leafDropped() {
  $($leaf).animate({
    left:-400,
    top:-100,
    opacity:0,
})

}
