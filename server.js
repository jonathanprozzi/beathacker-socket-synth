var express = require('express');
var app = express();
var server = app.listen(3000);

var socket = require('socket.io');
var io = socket(server);
console.log('powering up !');

app.use(express.static('public'));

io.sockets.on('connection', serverConnection);

function serverConnection(socket) {
    console.log('socket connected: ' + socket.id);

    socket.on('sounds', soundReceived);
    socket.on('waves', waveReceived);

    function soundReceived(data) {
        console.log(data.nameData.oscillator);
        var emitObject = {
            waveValue: data.nameData.oscillator,
            ampValue: data.ampData.aLevel,
            freqValue: data.freqData
        };

        socket.broadcast.emit('sounds', emitObject);
        console.log('waveform: ' + emitObject.waveValue);
        console.log('amplitude: ' + emitObject.ampValue);
        console.log('note frequency: ' + emitObject.freqValue);
    }

    function waveReceived(data) {
        console.log(data);
        var emitColorObject = {
            colorValue: data.colorVal.levels,
            waveType: data.waveTypeVal
        };
        socket.broadcast.emit('waves', emitColorObject);
    }
}
