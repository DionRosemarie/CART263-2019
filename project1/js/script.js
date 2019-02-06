/*****************

Happines is Sisyphus?
Rose-Marie Dion

******************/


// varibles for the game to work
let $ant;
let $leaf;
let swap;
let $wind;
let $antText;
let $windText;
let numLeaf = 6;
let shakeLeaf = 500;
let leafSound = new Audio("assets/sounds/leaves.mp3");

// setup of the document
$(document).ready(function() {
  //setting all the variables
  $ant = $('#ant');
  $wind = $('#wind');
  $ant = $('#ant');
  $leaf = $('.leaf');
  $antText = $('.antText');
  $windText = $('.windText');

  //the swap function is false otherwise it will swap when loading the page
  console.log($leaf);
  swap = false;
  // hide the variables i don't need at the beginning
  $($wind).hide();
  $antText.hide();
  $windText.hide();
  // on mouseover, the leaf that is draggable is going to shake
  $leaf.on("mouseover", leafShake);

  // on click, the text of what to do will appear
  $leaf.click(function() {
  $antText.show();
  });

  // draggable function
  $leaf.draggable({
    // only starts when the leaf is dragged
    start: function(event, ui) {
      console.log('start');
      swap = true;
      setInterval(swapImages, 200);
    },
    // stopped when the leaf is not dragged
    stop: function(event, ui) {
      swap = false;
    }

  });

  // droppable function for the ant
  $($ant).droppable({
    drop: leafDropped,


  })

});

// functin to make the leaf shake when mouseover
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
    // if the object is dragged on the droppable object, remove it
    $(ui.draggable).remove();
    // seeing how much leaves are gone
    numLeaf -= 1;
    console.log(numLeaf);
    // make a new leaf appear when it is remove
    newLeaf();
  });

  // make appear and disappear the element i want in my game/composition
  $($wind).show();
  $($wind).fadeOut(500);
  $windText.show();
  $antText.fadeOut(500);
}
// new leaf function when it is remove
function newLeaf() {
  // When the leaf is remove, a new leaf appears by calling a new image
  $('body').append('<div class="leaf"><img src="./assets/images/leaf.png" id="leaf2" width="100" height="100"></div>');
  $leaf = $('.leaf');

  // make the new leaf shake
  $leaf.on("mouseover", leafShake);

  // make the information about the wind disappear
  $windText.fadeOut(4000);
  // make the new leaf draggable
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
