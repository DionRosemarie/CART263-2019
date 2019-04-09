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

  const message_container = document.querySelector('.messages');
  const form = document.querySelector('form');
  const input_box = document.querySelector('input');
  form.addEventListener(‘submit’, (e) => {
   e.preventDefault();
   selfReply(input_box.value);
   input_box.value = ‘’;
  });
}
  function botReply(message){
   message_container.innerHTML += `<div class=”bot”>${message}</div>`;
   location.href = ‘#edge’;
  }
  function selfReply(message){
   message_container.innerHTML += `<div class=”self”>${message}</div>`;
   location.href = ‘#edge’;

   bot.reply(“local-user”, message).then(function(reply) {
   botReply(reply);
   });
  }
  function botReady(){
   bot.sortReplies();
   botReply(‘Hello’);
  }
  function botNotReady(err){
   console.log(“An error has occurred.”, err);
  }
