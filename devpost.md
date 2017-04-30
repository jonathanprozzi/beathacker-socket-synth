## Inspiration
I have a background in music composition and music technology and over the last two years I've been increasingly interested in creating new types of instruments. As I learned more about web programming, I came across the Web Audio API. I was immediately excited because of my familiarity with digital signal processing. I fell in love with the accessibility to audio synthesis and composition that Web Audio presented.

I had an idea for creating a series of new collaborative musical instruments and experiences that leverage the Web Audio API. I realized that if I could determine a way to send Web Audio synthesis information over websockets I could greatly expand on the possibilities for interaction and collaboration between players!

I see this as a way to create instruments that are completely independent from a traditional model, such as a _group synthesizer_ where one player controls note frequency data and another controls filters via playing a platformer game.

## What it Does
_BeatHacker: Socket Synth_ is two parts: the client and the server. The client is a simple synthesizer where the player uses keyboard keys A - K to play the notes of a C3 major scale. There is a slider for changing amplitude and selection of the four main waveforms: sine, sawtooth, square, and triangle.

The basic information needed for synthesis (frequency, amplitude, waveform) is then sent to a node.js/express.js server via socket.io, and the client is able to listen and synthesize the data sent by another instance.

This enables multiple instances and for audio synthesis data to be sent from one instance to the other, and then generated in the user's active window.

## How I Built It
I built this with JavaScript. The p5.js library (and it's core library extensions p5.dom and p5.sound) are the core of the client front end. The p5.sound library is a wrapper for the Web Audio API. The generated synth data is then broadcast to a node.js/express.js backend via socket.io. The information is then parsed and processed and stored in an object, which is then emitted from the server back to the client. The client is constantly listening for the new audio synthesis data from the server.

The client has a basic interface for displaying the synth information that is both sent and received.

## What's Next?
The next step is to begin using these connections to begin creating games and instruments that can push the question of what an instrument has to be!
