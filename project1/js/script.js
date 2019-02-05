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

let $leafImage = [
  "assets/images/leaf.png",
  "assets/images/leaf2.png",
  "assets/images/leaf3.png",
  "assets/images/leaf4.png",
  "assets/images/leaf5.png",
  "assets/images/leaf6.png",
]


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
function leafDropped(event, ui,) {
  console.log('leaf');
  $(ui.draggable).animate({
    left: -400,
    top: -100,
    opacity: 0,
  }, function() {
    console.log("remove");
    $(ui.draggable).position({top: 100, left: 100,});
    // change the src attribute of ui.draggable to a random image from the array
    //var display = Math.floor(Math.random() * leafImages.length);


    numLeaf -= 1;
    console.log(numLeaf);
    newLeaf(ui.draggable.attr('num'));

  });

  $($wind).show();
  $($wind).fadeOut(500);
}

function newLeaf() {
  $('body').append(randomLeaf());
  $leaf = $('.leaf');

  $leaf.draggable({
    start: function(event, ui) {
      console.log('start');
      swap = true;
      setInterval(swapImages, 200);
    },
    stop: function(event, ui) {
      swap = false;
    }

  })
}

function randomLeaf(leafnumber) {
  console.log("random");
  var leafRandom = $('#leaf'+ leafnumber);
//  if (leafRandom.length) {
  //  console.log("random2");
    var display = Math.floor(Math.random() * leafRandom.length);
    //leafImages[display]
    for (var i = 0; i < leafRandom.length; i++) {
      if (i !== display) {
        $(leafRandom[i]).hide();
      }

    }
//  }
}
