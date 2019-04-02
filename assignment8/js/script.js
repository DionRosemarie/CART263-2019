"use strict";

/***********************************************
For project 3, i'm going to do a game that make reference to the AI Eliza made by Joseph Weizenbeaum in 1964. The main goal of the game is going to try to crack the AI. It is going to try to change the subject, go around the subject, just like Eliza, but the user will need to stay focus and continue to ask question that is goig to break the AI. I decided to use RiveScript because it give me a lot of posibility in the scenario. This prototype is a really small example of what RiveScript can do. I had difficulty trying to understand how it works but with this, I covered the principal. I'm going to had further in animation with the AI once the scenario is all done like adding music or images to distract the user of his goal.
***********************************************/

// variable for the answer giving by the computer
let bot;
// varibale for picking a random number
let num;

// setup
function setup() {

  // loading my bot
  bot = new RiveScript();
  bot.loadFile("js/brain.rive").then(brainReady).catch(brainError);

  // linking my html to my comands
  let button = select('#submit');
  let user_input = select('#user_input');
  let output = select('#output');

  // if mouse is pressed, send the answer
  button.mousePressed(chat);
  // anime the title with the library textilate
  textAnimation();

}

function textAnimation() {
   $('.title').textillate({
      in : {
           effect:'fadeIn',
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
  num = floor(random(100) + 1);
}

// if something goes wrong, the brain is not ready
function brainError() {
  console.log('chatbot error');
}

// once the mouse is pressed, the game starts and the interaction betwen the user and bots goes on
function chat() {
  // select in the box what the user wrote
  let input = $('#user_input').val();
  // path to the brain of the bot and see if the answer of the user match the scenario
  bot.reply("local_user", input).then(function(reply) {
    console.log(reply);
    // show the answer of the scenario in the reply html box
    $('#output').html(reply);
    responsiveVoice.speak(reply, 'UK English Female', {
      pitch: 1
    }, {
      rate: 1
    });
  });
  // path to the brain of the bot and see if the answer of the user match the random number selected
  let reply = bot.reply("local_user", "set " + num).then(function(reply) {
    console.log(num);
    // show the answer of the scenario in the reply html box
    $('#output').html(reply);
    responsiveVoice.speak(reply, 'UK English Female', {
      pitch: 1
    }, {
      rate: 1
    });
  });

}
