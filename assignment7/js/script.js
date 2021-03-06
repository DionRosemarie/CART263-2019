"use strict";

/*****************

Music Box
Pippin Barr

A simple example of procedural music generation using Pizzicato's
synthesis and soundfile playing abilities.

******************/

// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

// We need an array of the possible notes to play as frequencies (in Hz)
// A Major =  A, B, C♯, D, E, F♯, and G♯
// We can get the frequencies of these notes from THE INTERNET, e.g.
// http://pages.mtu.edu/~suits/notefreqs.html
let frequencies = [
  220,246.94,277.18,293.66,329.63,369.99,415.30
];
// The synth
let synth;
// The sound files
let kick;
let snare;
let hihat;
// Our drum pattern
// Each array element is one beat and has a string with each
// drum to play for that beat
// x = kick, o = snare, * = hihat
let patterns = [
  'x',
  '*o*',
  'xo*',
  ' ',
  'x',
  'xxxx',
  'xoxoxox',
  '*'];

let pattern;
// Which beat of the pattern we're at right now
let patternIndex = 0;

let beatStarted = false;

let silence;
let silenceMin = 0.2;
let silenceMax = 0.4;
// setup()
//
// Creat canvas, set up the synth and sound files.
function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create the synth
  synth = new Pizzicato.Sound({
    source: 'wave',
    options: {
      type: 'sine',
      attack: ATTACK,
      release: RELEASE,
      frequency: 220
    }
  });

  var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.9,
    time: 0.8,
    mix: 0.7
});

var distortion = new Pizzicato.Effects.Distortion({
    gain: 0.7
});

synth.addEffect(pingPongDelay);
synth.addEffect(distortion);

  // Load the three drum sounds as wav files
  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });
}

// mousePressed
//
// Using this to start the note and drum sequences to get around
// user interaction (and to give the files time to load)
function mousePressed() {
  // random pattern when mouse
  pattern = patterns[Math.floor(Math.random()*patterns.length)].split("");
  silence = (Math.random()*(silenceMax-silenceMin)) + silenceMin;
  if (beatStarted === false) {
    setInterval(playNote,200);
    setInterval(playDrum,100);
    beatStarted = true;
  }

}

// playNote
//
// Chooses a random frequency and assigns it to the synth
function playNote() {
  // Pick a random frequency from the array
  let frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
  // Set the synth's frequency
  synth.frequency = frequency;

  if (Math.random() < silence) {
  synth.play();
  }
  else {
  synth.pause();
  }
  playLoop();
}

function playLoop() {
  let timeoutSynth;
  let MAX_NOTE_DURATION = 5;
  let MIN_NOTE_LENGTH = 500;
  // making math random betwwen a full number
  let duration = (Math.floor(Math.random()*MAX_NOTE_DURATION)+1)*MIN_NOTE_LENGTH;
  timeoutSynth = setTimeout(playNote, duration);
}


// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[patternIndex];

  // If there's an 'x' in there, play the kick
  if (symbols.indexOf('x') !== -1) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.indexOf('o') !== -1) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.indexOf('*') !== -1) {
    hihat.play();
  }
  // Advance the pattern by a beat
  patternIndex = (patternIndex + 1) % pattern.length;
}

// draw()
//
// Nothing right now.

function draw() {
}
