var waveOne;
var waveTwo;
var envOne;
var envTwo;
var waveForm = 'sine';
var ampLevel;
var ampSlider;
var ampDrawOne;
var drawCol;

//envelope global variables:
var attackLevel = 1;
var releaseLevel = 0;
var attackTime = 0.001;
var decayTime = 0.25;
var sustainPercent = 0.4;
var releaseTime = 0.25;
var waveDisplay;
var fftOne;
var noiseOne;
var filterOne;
var fftOne;
var socketName;

//available notes array:
var noteFreq = [130.81, 146.83, 164.81, 174.61, 196,
    220, 246.94, 261.63
];

var socket;

function setup() {
    socket = io.connect('http://127.0.0.1:3000');
    socket.on('sounds', receivedSounds);
    socket.on('waves', receivedWaves);

    var mainCanvas = createCanvas(400, 400);
    mainCanvas.parent('canvas-container');
    ampSlider = createSlider(0.25, 1, 0.5, 0.125);
    ampSlider.style('width', '400px');
    textAlign(CENTER);
    ampSlider.parent('slider-container',1);
    drawCol = color(255, 0, 100);
    waveOne = new p5.Oscillator();
    envOne = new p5.Env();
    envOne.setADSR(attackTime, decayTime, sustainPercent, releaseTime);
    envOne.setRange(ampSlider.value(), releaseLevel);

    waveTwo = new p5.Oscillator();
    envTwo = new p5.Env();
    envTwo.setADSR(attackTime, decayTime, sustainPercent, releaseTime);
    envTwo.setRange(0.5, releaseLevel);

    ampDrawOne = new p5.Amplitude();
}

function receivedSounds(data) {
    console.log('receiving data!');
    strokeWeight(2);
    stroke(255, 50);
    fill(drawCol);
    ellipse(200, 200, data.ampValue * 100, 100);
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("Received 'amplitude': " + data.ampValue, width / 2, 275);
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("Received 'note': " + data.freqValue, width / 2, 300);
    console.log('received amplitude: ' + data.ampValue);
    console.log('received frequency: ' + data.freqValue);
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255,0,100);
    text("Incoming broadcast!", 200, 100);
    console.log('broadcast oscillator event');
    waveTwo.amp(data.ampValue);
    waveTwo.freq(data.freqValue);
    waveTwo.start();
    envTwo.play();
    envTwo.triggerRelease();
    waveTwo.stop();
}

function receivedWaves(data) {
    console.log('incoming color information: ' + data.colorValue);
    drawCol = data.colorValue;
    waveDisplay = data.waveType;
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("New wave form: " + waveDisplay, width / 2, 350);

}

function playNote(soundName, envName, ampVal, freqVal) {
    soundName.start();
    console.log('console osc event')
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
    envOne.setRange(ampSlider.value(), releaseLevel);
    readKeys();
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("[Values Sent:]", width / 2, 25);
    background(25, 100);

    if (waveDisplay === undefined) {
        waveDisplay = 'sine';
    }
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("[Current Wave: " + waveDisplay + "]", width / 2, 40);
    stroke(255, 0, 100);
    line(0, width / 2, height, width / 2);

    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 100);
    text("[Values Received:]", width / 2, 225);
}

function readKeys() {
    if (keyIsDown(65)) {
        playNote(waveOne, envOne, envOne, noteFreq[0]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'A' key pressed: sending note C3", width / 2, 100);
    } else if (keyIsDown(83)) {
        playNote(waveOne, envOne, envOne, noteFreq[1]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'S' key pressed: sending note D3", width / 2, 100);
    } else if (keyIsDown(68)) {
        playNote(waveOne, envOne, envOne, noteFreq[2]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'D' key pressed: sending note E3", width / 2, 100);
    } else if (keyIsDown(70)) {
        playNote(waveOne, envOne, envOne, noteFreq[3]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'F' key pressed: sending note F3", width / 2, 100);
    } else if (keyIsDown(71)) {
        playNote(waveOne, envOne, envOne, noteFreq[4]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'G' key pressed: sending note G3", width / 2, 100);
    } else if (keyIsDown(72)) {
        playNote(waveOne, envOne, envOne, noteFreq[5]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'H' key pressed: sending note A3", width / 2, 100);
    } else if (keyIsDown(74)) {
        playNote(waveOne, envOne, envOne, noteFreq[6]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'J' key pressed: sending note B3", width / 2, 100);
    } else if (keyIsDown(75)) {
        playNote(waveOne, envOne, envOne, noteFreq[7]);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("'K' key pressed: sending note C4", width / 2, 100);
    }


    if (keyIsDown(89)) {
        waveForm = 'sine';
        drawCol = color(100, 0, 255);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(203, 75, 22);
        text("waveform set to: sine", width / 2, 150);
        var waveFormData = {
            colorVal: drawCol,
            waveTypeVal: waveForm
        };
        socket.emit('waves', waveFormData);
    } else if (keyIsDown(85)) {
        waveForm = 'square';
        drawCol = color(211, 54, 130);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("waveform set to: square", width / 2, 150);
        var waveFormData = {
            colorVal: drawCol,
            waveTypeVal: waveForm
        };
        socket.emit('waves', waveFormData);
    } else if (keyIsDown(73)) {
        waveForm = 'triangle';
        drawCol = color(38, 139, 210);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("waveform set to: triangle", width / 2, 150);
        var waveFormData = {
            colorVal: drawCol,
            waveTypeVal: waveForm
        };
        socket.emit('waves', waveFormData);
    } else if (keyIsDown(79)) {
        waveForm = 'sawtooth';
        drawCol = color(42, 161, 152);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(255, 0, 100);
        text("waveform set to: sawtooth", width / 2, 150);
        var waveFormData = {
            colorVal: drawCol,
            waveTypeVal: waveForm
        };
        socket.emit('waves', waveFormData);
    }
}
