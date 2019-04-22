"use strict";

// variable for the answer giving by the computer
let bot;
// varibale for picking a random number
let clues;
let numClues = 0;

// variables for the timer
let counter = 0;
let timeLeft = 180;

// setup
function setup() {
  // loading my bot
  bot = new RiveScript();
  bot.loadFile("js/brain.rive").then(brainReady).catch(brainError);

  // linking my html to my comands
  let button = select('#submit');
  let user_input = select('#user_input');
  let output = select('#output');

  // when the player click send, the message is going into the chatbox
  button.mousePressed(chat);
  $('#submit').on('click', function() {
    clearSendTextbox();

  });
// anime the title with the library textilate
  $('.title').textillate({ in: {
      effect: 'fadeIn',
      delay: 200,
    },
    loop: false,
    minDisplayTime: 5000,

  });

  setTimeout(begin, 4000);
  // hide all the divs in the index.html
  $('#click-to-start').hide();
  $('#text').hide();
  $('.chatbox').hide();
  $('#start').hide();
  $('#timer').hide();
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
}

// function to have a countdown on the top of the game
function countdown() {
  var params = getURLParams();
  if (params.minute) {
    var min = params.minute;
    timeLeft = min * 60;
  }


  var timer = select('#timer');
  timer.html(convertSeconds(timeLeft - counter));

  var interval = setInterval(timeIt, 1000);
// function to make the countdown goes down and not up
  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeLeft - counter));

// if the countdown is over, the game is over
    if (counter == timeLeft) {
      clearInterval(interval);
      $('#timer').css("color", "red");
      setTimeout(endGame, 1000);
    }
  }
}

// conver the second into other numbers
function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

// starting the game
function begin() {
  $('#click-to-start').show();
  $('#click-to-start').click(instruction);

// animate the button
  $('#click-to-start').textillate({ in: {
      effect: 'fadeIn',
    },
    loop: false,
    minDisplayTime: 500,
  });
}

// displaying the instructions
function instruction() {
  $('.title').hide();
  $('#click-to-start').hide();
  $('#text').show();
  $('#start').show();
// if the function are called here, there is no loop in the sound on setTimeout
  $('#start').on("click", function() {
    countdown();
    chat();
    glitchSound();
    setTimeout(helpMessage,5000);
  });
}

// if everything runs normally, the brain si ready
function brainReady() {
  console.log('chatbot ready');
  bot.sortReplies();
  //  num = floor(random(100) + 1);
}

// if something goes wrong, the brain is not ready
function brainError() {
  console.log('chatbot error');
}
// when the message is send, clear the message area
function clearSendTextbox() {
  $('#user_input').val('');
}
// keep track of all the old messages
function newMessage() {
  let input = $('#user_input').val();
  $('#output').append('user:' + input + '<br><br>');
}

// once the mouse is pressed, the game starts and the interaction betwen the user and bots goes on
function chat() {
  console.log(numClues);
  $('#text').hide();
  $('#start').hide();
  $('.chatbox').show();
  $('#timer').show();
  // select in the box what the user wrote
  let input = $('#user_input').val();

// keep track of all the old messages
  if (input !== '') {
    newMessage();
  }
  // path to the brain of the bot and see if the answer of the user match the scenario
    bot.reply("local_user", input).then(function(reply) {
    setTimeout(function() {
      $('#output').append('bot:' + reply + '<br><br>');
      // show the answer of the scenario in the reply html box
      // let the bot talk to you
      let voice = responsiveVoice.speak(reply, 'UK English Female', {
        pitch: 1
      }, {
        rate: 1
      });
    }, 1000);

  });
// if the player has ask the right question, then display the end game
  if (numClues == 5) {
  setTimeout(breakEliza, 5000);
  }

}

// function to add an indication that the player is near a clue
function glitchSound() {
  var whiteNoise = new Pizzicato.Sound(function(e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < e.outputBuffer.length; i++)
  output[i] = Math.random();
  });
// the sound is only going to play when the right answer is called
  if (numClues++) {
  whiteNoise.play();
  whiteNoise.attack = 1;
  setTimeout(function () {
  whiteNoise.stop();
  }, 500);
  }

}

// if the player won
function breakEliza() {
  let $button = $('<div class="newGame"></div>');
  $button.text("start");
  $button.button();
  $button.css({
    "font-family": 'Share Tech Mono',
    display: 'block',
    width: 100,
    margin: 'auto',
    color: 'white',
    marginTop: 100,
    backgroundColor: 'black',
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1
  });
  $button.on('click', function() {
    location.reload(true);
  });
  $('body').append($button);
// effect of breaking eliza
  $('.chatbox').toggle("explode", {
    pieces: 50
  }, 1500);
  $('#timer').toggle("explode", {
    pieces: 50
  }, 1500);
  $('#text').show();
  $('#text').text("I am Eliza You won");
  $('#text').css({
    "top": "500px",
  });
// setting back the num of clues found to 0
  numClues=0;
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
}

// this helps to player to keep track of the scenario
function helpMessage() {
  $('#helpOne').show();
  $('#helpOne').click(function () {
  alert("Talk to her, ask her name, how she is");
  $('#helpOne').remove();
  setTimeout(clueTwo,5000);
  });

  function clueTwo() {
  $('#helpTwo').show();
  $('#helpTwo').click(function () {
  alert("Maybe ask her if she is real");
  $('#helpTwo').remove();
  setTimeout(clueThree,5000);
  });
  }

  function clueThree() {
  $('#helpThree').show();
  $('#helpThree').click(function () {
  alert("Be persistent, ask over and over");
  $('#helpThree').remove();
  });
  }

}

// if the countdown went to 0 and the player did not get all the clues
function endGame() {
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
  $('.chatbox').hide();
  $('#timer').hide();
  $('#text').show();
  $('#text').text("Your session is over, please comeback talk to me after my next patient");

// setting back all the clues found to 0
  numClues=0;
// displaying if the button to go back
  let $button = $('<div class="newGame"></div>');
  $button.text("start");
  $button.button();

  $button.css({
    "font-family": 'Share Tech Mono',
    display: 'block',
    width: 100,
    margin: 'auto',
    color: 'white',
    marginTop: 100,
    backgroundColor: 'black',
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1
  });

  $button.on('click', function() {
    location.reload(true);
  });

  $('body').append($button);
}
