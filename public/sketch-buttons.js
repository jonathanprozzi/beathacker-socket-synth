var waveOne;
var envOne;
var waveForm = 'sine';
var ampLevel;
var ampSlider;
var ampDrawOne;
var ampDrawHistory = [];
var ampHistoryLength;
var drawCol;
//envelope global variables:
var attackLevel = 1;
var releaseLevel = 0;
var attackTime = 0.001;
var decayTime = 0.2;
var sustainPercent = 0.2;
var releaseTime = 0.5;
var playing;
// note button variables:
var buttonC;
var buttonD;
var buttonE;
var buttonF;
var buttonG;
var buttonA;
var buttonB;
var buttonOctC;

//available notes array:
var noteFreq = [130.81, 146.83, 164.81, 174.61, 196,
    220, 246.94, 261.63
];

var socket;

function setup() {
    socket = io.connect('http://127.0.0.1:3000');
    socket.on('sounds', receivedSounds);
    var mainCanvas = createCanvas(400, 400);
    ampSlider = createSlider(0, 1, 0.5, 0.25);
    ampSlider.position(width / 2, height - 50);


    drawCol = color(255, 0, 100);
    waveOne = new p5.Oscillator();

    envOne = new p5.Env();
    envOne.setADSR(attackTime, decayTime, sustainPercent, releaseTime);
    envOne.setRange(ampSlider.value(), releaseLevel);

    ampDrawOne = new p5.Amplitude();

    buttonC = createButton('C3');
    buttonC.position(0, height);
    buttonC.style('width', '50px');
    buttonD = createButton('D3');
    buttonD.position(50, height);
    buttonD.style('width', '50px');
    buttonE = createButton('E3');
    buttonE.position(100, height);
    buttonE.style('width', '50px');
    buttonF = createButton('F3');
    buttonF.position(150, height);
    buttonF.style('width', '50px');
    buttonG = createButton('G3');
    buttonG.position(200, height);
    buttonG.style('width', '50px');
    buttonA = createButton('A3');
    buttonA.position(250, height);
    buttonA.style('width', '50px');
    buttonB = createButton('B3');
    buttonB.position(300, height);
    buttonB.style('width', '50px');
    buttonOctC = createButton('C4');
    buttonOctC.position(350, height);
    buttonOctC.style('width', '50px');
}

function receivedSounds(data) {
    console.log('receiving data!');
    fill(drawCol);
    ellipse(200, 200, data.ampValue * 100, 100);

    console.log('received amplitude: ' + data.ampValue);
    console.log('received frequency: ' + data.freqValue);
    waveOne.start();
    waveOne.amp(data.ampValue);
    waveOne.freq(data.freqValue);
    envOne.play();
    waveOne.stop();

}

function playNote(soundName, envName, ampVal, freqVal) {
    soundName.start();
    // envName.triggerAttack();
    envName.play();
    soundName.setType(waveForm);
    soundName.amp(ampVal);
    soundName.freq(freqVal);
    console.log('sending data');

    var soundData = {
        nameData: waveOne,
        envData: envName,
        ampData: ampVal,
        freqData: freqVal
    };

    socket.emit('sounds', soundData);

    function keyReleased() {
        envName.triggerRelease();
        soundName.stop();
        return false;
    }
}


function draw() {
    // ampSliderVal = ampSlider.value();
    envOne.setRange(ampSlider.value(), releaseLevel);
    readKeys();
    buttonC.mousePressed(notePressed);
    // fill(drawCol);
    // ellipse(100,100, ampDrawOne, 100);
    background(25, 100);
}

function notePressed() {
    if (!playing) {
        playNote(waveOne, envOne, envOne, noteFreq[0]);
        playing = false;
    }
}

function readKeys() {
    if (keyIsDown(65)) {
        playNote(waveOne, envOne, envOne, noteFreq[0]);
    } else if (keyIsDown(83)) {
        playNote(waveOne, envOne, envOne, noteFreq[1]);
    } else if (keyIsDown(68)) {
        playNote(waveOne, envOne, envOne, noteFreq[2]);
    } else if (keyIsDown(70)) {
        playNote(waveOne, envOne, envOne, noteFreq[3]);
    } else if (keyIsDown(71)) {
        playNote(waveOne, envOne, envOne, noteFreq[4]);
    } else if (keyIsDown(72)) {
        playNote(waveOne, envOne, envOne, noteFreq[5]);
    } else if (keyIsDown(74)) {
        playNote(waveOne, envOne, envOne, noteFreq[6]);
    } else if (keyIsDown(75)) {
        playNote(waveOne, envOne, envOne, noteFreq[7]);
    }

    if (keyIsDown(89)) {
        waveForm = 'sine';
        drawCol = color(100, 0, 255);
    } else if (keyIsDown(85)) {
        waveForm = 'square';
        drawCol = color(0, 100, 255);
    } else if (keyIsDown(73)) {
        waveForm = 'triangle';
        drawCol = color(255, 0, 100);
    } else if (keyIsDown(79)) {
        waveForm = 'sawtooth';
        drawCol = color(255, 0, 255);
    }
}
