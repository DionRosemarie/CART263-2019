let adjective;
let job;
let hobby;
let object;
let verb;
let movement;
let hero;
let qualitie;
let transport;
let emotion;
let gift;

$(document).ready(function() {
  $.getJSON('js/libraries/data.json',dataLoaded);

});

function dataLoaded(data) {
  console.log(data);
  adjective = getRandomElement(data.adjectives);
  //console.log(adjective);
  job = getRandomElement(data.jobs);
  //console.log(job);
  hobby = getRandomElement(data.hobbies);
  //console.log(hobby);
  object = getRandomElement(data.objects);
  //console.log(object);
  verb = getRandomElement(data.verbs);
  //console.log(verb);
  movement = getRandomElement(data.movements);
  //console.log(movement);
  hero = getRandomElement(data.heroes);
  //console.log(hero);
  qualitie = getRandomElement(data.qualities);
  //console.log(qualitie);
  transport = getRandomElement(data.transports);
  //console.log(transport);
  emotion = getRandomElement(data.emotions);
  //console.log(emotion);
  gift = getRandomElement(data.gifts);
  //console.log(gift);
  setup();
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}
