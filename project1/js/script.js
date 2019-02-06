/*****************

Happines is Sisyphus?
Rose-Marie Dion

******************/



let $ant;

let $leaf;
let swap;
let $wind;
let $text;
let numLeaf = 6;
let shakeLeaf = 500;
let leafSound = new Audio("assets/sounds/leaves.mp3");

$(document).ready(function() {
  $ant = $('#ant');
  $wind = $('#wind');
  $ant = $('#ant');
  $leaf = $('.leaf');
  $text = $('.text');

  console.log($leaf);
  swap = false;

  $($wind).hide();
  $text.hide();

  $leaf.on("mouseover", leafShake);

  $leaf.click(function() {
  $text.show();
});

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

function leafShake() {
   setInterval(shakeLeaf, $(this).effect("shake"));
  leafSound.play();
}

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
function leafDropped(event, ui, ) {
  console.log('leaf');
  $(ui.draggable).animate({
    left: -400,
    top: -100,
    opacity: 0,

  }, function() {
    console.log("remove");
    $(ui.draggable).remove();

    numLeaf -= 1;
    console.log(numLeaf);
    newLeaf();
    leaf
  });

  $($wind).show();
  $($wind).fadeOut(500);
  $text.fadeOut(500);
}

function newLeaf() {

  $('body').append('<div class="leaf"><img src="./assets/images/leaf.png" id="leaf2" width="100" height="100"></div>');
  $leaf = $('.leaf');

  $leaf.on("mouseover", leafShake);

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
