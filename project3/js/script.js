"use strict";

/***********************************************
For project 3, i'm going to do a game that make reference to the AI Eliza made by Joseph Weizenbeaum in 1964. The main goal of the game is going to try to crack the AI. It is going to try to change the subject, go around the subject, just like Eliza, but the user will need to stay focus and continue to ask question that is goig to break the AI. I decided to use RiveScript because it give me a lot of posibility in the scenario. This prototype is a really small example of what RiveScript can do. I had difficulty trying to understand how it works but with this, I covered the principal. I'm going to had further in animation with the AI once the scenario is all done like adding music or images to distract the user of his goal.
***********************************************/

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

  button.mousePressed(chat);
  $('#submit').on('click', function() {
    clearSendTextbox();

  });


  // anime the title with the library textilate
  textAnimation();
  setTimeout(begin, 4000);
  $('#click-to-start').hide();
  $('#text').hide();
  $('.chatbox').hide();
  $('#start').hide();
  $('#timer').hide();
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
}

function countdown() {
  var params = getURLParams();
  if (params.minute) {
    var min = params.minute;
    timeLeft = min * 60;
  }

  var timer = select('#timer');
  timer.html(convertSeconds(timeLeft - counter));

  var interval = setInterval(timeIt, 1000);

  function timeIt() {
    counter++;
    timer.html(convertSeconds(timeLeft - counter));

    if (counter == timeLeft) {
      clearInterval(interval);
      $('#timer').css("color", "red");
      setTimeout(endGame, 1000);
    }
  }
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function begin() {
  $('#click-to-start').show();
  $('#click-to-start').click(instruction);

  $('#click-to-start').textillate({ in: {
      effect: 'fadeIn',
    },
    out: {
      effect: 'fadeOut'
    },
    loop: false,
    minDisplayTime: 500,
  });
}

function instruction() {
  $('.title').hide();
  $('#click-to-start').hide();
  $('#text').show();
  $('#start').show();
  $('#start').on("click", function() {
    countdown();
    chat();
    glitchSound();
    setTimeout(helpMessage,5000);
  });
}

function textAnimation() {
  $('.title').textillate({ in: {
      effect: 'fadeIn',
      delay: 200,
    },
    out: {
      effect: 'rollOut'
    },
    loop: false,
    minDisplayTime: 5000,

  });

};

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

function clearSendTextbox() {
  $('#user_input').val('');
}

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

  if (input !== '') {
    newMessage();
  }
  // path to the brain of the bot and see if the answer of the user match the scenario
    bot.reply("local_user", input).then(function(reply) {
    setTimeout(function() {
      $('#output').append('bot:' + reply + '<br><br>');
      // show the answer of the scenario in the reply html box

      let voice = responsiveVoice.speak(reply, 'UK English Female', {
        pitch: 1
      }, {
        rate: 1
      });
    }, 1000);

  });

  if (numClues == 5) {
  setTimeout(breakEliza, 5000);
  }

}

function glitchSound() {
  var whiteNoise = new Pizzicato.Sound(function(e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < e.outputBuffer.length; i++)
  output[i] = Math.random();
  });
  if (numClues++) {
  whiteNoise.play();
  whiteNoise.attack = 1;
  setTimeout(function () {
  whiteNoise.stop();
  }, 500);
  }

}


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
  numClues=0;
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
}

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


function endGame() {
  $('#helpOne').hide();
  $('#helpTwo').hide();
  $('#helpThree').hide();
  $('.chatbox').hide();
  $('#timer').hide();
  $('#text').show();
  $('#text').text("Your session is over, please comeback talk to me after my next patient");

  numClues=0;

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
