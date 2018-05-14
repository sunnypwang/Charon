# Charon
Charon is a Word Guessing Game Application using auto speech recognition to detect the answer.

## Setup
1. This project uses React. In order to run React you need `npm`, which can be installed with `node.js` installer.
2. Replace `HCLC.fst` and `words.txt` in your ASR model.
3. Set up and start your kaldi gstreamer server.
4. Go to `lib/client.js` and edit the web socket URL to match your kaldi gstreamer URL.
5. Go to the project root directory.
6. To start the web application, type the following command in command line.
```
npm start
```

7. React will start your browser automatically. If it fails to do so, you can manually go to `http://localhost:3000/`


## How to play

There should be at least two people to play this game. 
The first will try to guess the word displayed on screen while the second will look at the word on screen try to hint the first player without speaking the actual word.

To pass, the guesser should say "ผ่าน" as an asnwer.
